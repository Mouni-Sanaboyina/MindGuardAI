
# 🛡️ MindGuardAI – AI Content Moderation Platform

MindGuardAI is a **multi-modal AI system** designed to detect and moderate harmful content across **text, audio, and images**. It mimics real-world moderation systems used by platforms like YouTube and social media.

---

## 🚀 Features

- 📝 **Text Moderation**
  - Detects harmful or sensitive content using NLP-based risk scoring
  - Categories: Violence, Harassment, Self-harm

- 🎤 **Audio Moderation**
  - Converts speech to text using **Whisper ASR**
  - Applies NLP analysis on transcribed content

- 🖼️ **Image Moderation**
  - Uses **CLIP (Vision-Language Model)** for semantic understanding
  - Detects violent or sensitive visuals
  - Applies **automatic blur** with safe-view toggle

- ⚠️ **Risk Scoring System**
  - Generates risk score (0–100)
  - Classifies as Low / Medium / High risk

- 🌐 **Full-Stack Web Application**
  - Interactive UI with real-time results

---

## 🧠 Tech Stack

### Frontend
- React (TypeScript)
- Tailwind CSS
- Vite

### Backend
- Python (Flask)
- Whisper (Speech-to-Text)
- CLIP (Image Moderation)
- NLTK (Text Processing)
- PyTorch

### Deployment
- Frontend: Vercel
- Backend: Render / Hugging Face / Cloud platforms

---

## 🏗️ Project Structure

mindguardai/
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ └── uploads/
│
├── src/
│ ├── components/
│ ├── pages/
│ └── ...
│
├── package.json
├── vite.config.ts
└── README.md


---

## ⚙️ How It Works

1. User uploads content (text / audio / image)
2. Backend processes input:
   - Audio → Whisper → Text → NLP
   - Image → CLIP → Risk detection
   - Text → NLP analysis
3. System generates:
   - Risk score
   - Category tags
   - Safe / Unsafe classification
4. UI displays:
   - Alerts
   - Blurred previews (for unsafe images)
   - Explanation of results

---

## 🛠️ Setup Instructions

### 1. Clone Repository

git clone https://github.com/Mouni-Sanaboyina/MindGuardAI/

cd mindguardai

https://github.com/Mouni-Sanaboyina/MindGuardAI/


---

### 2. Backend Setup

cd backend
pip install -r requirements.txt
python app.py


---

### 3. Frontend Setup

npm install
npm run dev

---

### 4. Run Application
Open:

http://localhost:5173


---

## 🌍 Deployment

- Frontend → Vercel
- Backend → Render / Hugging Face / Cloud services

---

## ⚠️ Limitations

- Free cloud tiers have memory limitations
- Heavy ML models (Whisper, CLIP) require optimization or separation
- Initial loading time may be high

---

## 🔮 Future Improvements

- 🎥 Video moderation (frame extraction + audio analysis)
- ☁️ Microservices architecture for scalability
- 🔐 User authentication
- 📊 Analytics dashboard
- ⚡ Lightweight optimized models

---

## 👩‍💻 Author

**Mounika Sanaboyina**  
B.Tech – Computer Science (AI & Data Science)

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
