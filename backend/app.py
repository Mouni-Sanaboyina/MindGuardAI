from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import nltk
import whisper
import torch
import clip
from PIL import Image, ImageFilter
from nltk.tokenize import word_tokenize

# ---------------- SETUP ----------------
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- NLTK ----------------
nltk.download("punkt")

# ---------------- LOAD MODELS ----------------
print("Loading Whisper...")
asr_model = whisper.load_model("base")
print("Whisper ready")

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print("Loading CLIP...")
clip_model, clip_preprocess = clip.load("ViT-B/32", device=DEVICE)
print("CLIP ready")

# ---------------- NLP CONFIG ----------------
RISK_KEYWORDS = {
    "Violence": ["kill", "stab", "attack", "blood", "fight", "gun", "knife"],
    "Harassment": ["hate", "idiot", "stupid", "abuse"],
    "Self Harm": ["suicide", "die", "cut", "self-harm"]
}

CATEGORY_WEIGHT = {
    "Violence": 35,
    "Harassment": 20,
    "Self Harm": 45
}

# ---------------- TEXT ANALYSIS ----------------
def analyze_text(text):
    tokens = word_tokenize(text.lower())
    score = 0
    tags = []

    for category, words in RISK_KEYWORDS.items():
        count = sum(1 for w in tokens if w in words)
        if count > 0:
            tags.append(category)
            score += min(
                count * CATEGORY_WEIGHT[category],
                CATEGORY_WEIGHT[category]
            )

    return min(score, 100), tags

# ---------------- IMAGE ANALYSIS (CLIP) ----------------
IMAGE_PROMPTS = {
    "Violence": [
        "people fighting violently",
        "a physical assault",
        "a person attacking another person"
    ],
    "Blood": [
        "visible blood injury",
        "a person bleeding"
    ],
    "Safe": [
        "a peaceful nature landscape",
        "a calm outdoor scene",
        "a safe normal photograph"
    ]
}

def analyze_image(image_path):
    image = clip_preprocess(
        Image.open(image_path).convert("RGB")
    ).unsqueeze(0).to(DEVICE)

    texts, labels = [], []
    for label, prompts in IMAGE_PROMPTS.items():
        for p in prompts:
            texts.append(p)
            labels.append(label)

    text_tokens = clip.tokenize(texts).to(DEVICE)

    with torch.no_grad():
        img_features = clip_model.encode_image(image)
        txt_features = clip_model.encode_text(text_tokens)

        img_features /= img_features.norm(dim=-1, keepdim=True)
        txt_features /= txt_features.norm(dim=-1, keepdim=True)

        sims = (img_features @ txt_features.T).squeeze(0)

    scores = {}
    for i, label in enumerate(labels):
        scores[label] = max(scores.get(label, -1), sims[i].item())

    scores = {k: round((v + 1) / 2, 3) for k, v in scores.items()}

    danger = max(scores.get("Violence", 0), scores.get("Blood", 0))
    safe = scores.get("Safe", 0)

    blur_required = danger > 0.6 and danger > safe
    return scores, blur_required

# ---------------- BLUR ----------------
def blur_image(path):
    img = Image.open(path)
    blurred = img.filter(ImageFilter.GaussianBlur(radius=16))
    blur_path = path.replace(".", "_blur.")
    blurred.save(blur_path)
    return blur_path

# ---------------- ROUTES ----------------
@app.route("/uploads/<filename>")
def get_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files.get("file")
    text_input = request.form.get("text", "").strip()

    # -------- AUDIO --------
    if file and file.filename.lower().endswith((".mp3", ".wav", ".m4a")):
        path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(path)

        result = asr_model.transcribe(path, fp16=False)
        transcript = result.get("text", "").strip()

        score, tags = analyze_text(transcript)

        return jsonify({
            "risk_score": score,
            "risk_level": "High" if score >= 70 else "Medium" if score >= 30 else "Low",
            "summary": "Potentially harmful content detected" if score >= 30 else "Content appears safe",
            "tags": tags,
            "transcribed_text": transcript,
            "ai_explanation": "Audio transcribed using Whisper and analyzed using NLP"
        })

    # -------- IMAGE --------
    if file and file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
        path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(path)

        scores, blur_required = analyze_image(path)
        blurred_path = blur_image(path) if blur_required else None

        return jsonify({
            "blur_required": blur_required,
            "image_scores": scores,
            "original_preview_url": f"/uploads/{file.filename}",
            "blurred_preview_url": f"/uploads/{os.path.basename(blurred_path)}" if blurred_path else None,
            "summary": "Potentially harmful visual content detected" if blur_required else "Image appears safe",
            "ai_explanation": "Image analyzed using CLIP semantic similarity"
        })

    # -------- TEXT --------
    if text_input:
        score, tags = analyze_text(text_input)

        return jsonify({
            "risk_score": score,
            "risk_level": "High" if score >= 70 else "Medium" if score >= 30 else "Low",
            "summary": "Potentially harmful content detected" if score >= 30 else "Content appears safe",
            "tags": tags,
            "transcribed_text": text_input,
            "ai_explanation": "Text analyzed using NLP keyword risk scoring"
        })

    return jsonify({"error": "Unsupported or empty input"}), 400

# ---------------- RUN ----------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
