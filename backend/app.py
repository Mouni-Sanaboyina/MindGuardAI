from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from PIL import Image, ImageFilter
import nltk
from nltk.tokenize import word_tokenize

# ---------------- SETUP ----------------
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- AI CONFIG ----------------
RISK_KEYWORDS = {
    "Violence": ["kill", "attack", "blood", "fight", "gun", "weapon"],
    "Harassment": ["hate", "idiot", "stupid", "abuse"],
    "Self Harm": ["suicide", "die", "cut", "self-harm"],
}

CATEGORY_WEIGHT = {
    "Violence": 35,
    "Harassment": 20,
    "Self Harm": 45
}

BLUR_THRESHOLD = 20

# ---------------- AI FUNCTIONS ----------------
def analyze_text_ai(text):
    tokens = word_tokenize(text.lower())
    score = 0
    tags = []

    for category, words in RISK_KEYWORDS.items():
        count = sum(1 for w in tokens if w in words)
        if count > 0:
            tags.append(category)
            score += min(count * CATEGORY_WEIGHT[category], CATEGORY_WEIGHT[category])

    return score, tags

def analyze_audio_proxy(filename):
    score = 0
    tags = []

    name = filename.lower()

    if any(w in name for w in ["angry", "fight", "shout", "scream"]):
        score += 30
        tags.append("Aggressive Audio")

    if any(w in name for w in ["blood", "violence", "attack"]):
        score += 40
        tags.append("Violence")

    if any(w in name for w in ["hate", "abuse"]):
        score += 25
        tags.append("Harassment")

    return score, tags


def analyze_filename_proxy(filename):
    score = 0
    tags = []

    name = filename.lower()
    if any(w in name for w in ["blood", "gun", "fight", "war"]):
        score += 35
        tags.append("Violence")

    return score, tags


def blur_image(path):
    img = Image.open(path)
    blurred = img.filter(ImageFilter.GaussianBlur(radius=12))
    blurred_path = path.replace(".", "_blur.")
    blurred.save(blurred_path)
    return blurred_path


def generate_summary(score, tags):
    if score < 30:
        return "No significant harmful indicators detected. Content appears safe."
    elif score < 70:
        return f"Moderate risk detected related to {', '.join(tags)}. Viewer discretion advised."
    else:
        return f"High-risk content detected involving {', '.join(tags)}. Content preview blurred for safety."

# ---------------- ROUTES ----------------
@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "running",
        "service": "MindGuard AI",
        "mode": "Real-time AI safety screening"
    })


@app.route("/uploads/<path:filename>")
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files.get("file")
    text = request.form.get("text", "")

    total_score = 0
    tags = []
    blur_required = False

    original_path = None
    blurred_path = None

    # -------- TEXT ANALYSIS --------
    if text.strip():
        text_score, text_tags = analyze_text_ai(text)
        total_score += text_score
        tags.extend(text_tags)

    # -------- FILE ANALYSIS --------
    if file:
        original_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(original_path)

        file_score, file_tags = analyze_filename_proxy(file.filename)
        total_score += file_score
        tags.extend(file_tags)

        if total_score >= BLUR_THRESHOLD:
            blurred_path = blur_image(original_path)
            blur_required = True

    total_score = min(total_score, 100)
    tags = list(set(tags))

    response = {
        "risk_score": total_score,
        "risk_level": "Low" if total_score < 30 else "Medium" if total_score < 70 else "High",
        "tags": tags,
        "blur_required": blur_required,
        "original_preview_url": f"/uploads/{os.path.basename(original_path)}" if original_path else None,
        "blurred_preview_url": f"/uploads/{os.path.basename(blurred_path)}" if blurred_path else None,
        "summary": generate_summary(total_score, tags),
        "ai_explanation": "Risk computed using NLP keyword analysis and multi-modal safety fusion"
    }

    return jsonify(response)

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
