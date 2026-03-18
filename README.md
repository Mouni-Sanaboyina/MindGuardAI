🛡️ MindGuardAI – AI Content Moderation Platform

MindGuardAI is a multi-modal AI system designed to detect and moderate harmful content across text, audio, and images. It mimics real-world moderation pipelines used by platforms like YouTube and social media.

🚀 Features

📝 Text Moderation

Detects harmful or sensitive content using NLP-based risk scoring

Categorizes into: Violence, Harassment, Self-harm

🎤 Audio Moderation

Converts speech to text using Whisper ASR

Applies NLP analysis on transcribed content

🖼️ Image Moderation

Uses CLIP (Vision-Language Model) for semantic understanding

Detects violent or sensitive visuals

Applies automatic blur with safe-view toggle

⚠️ Risk Scoring System

Generates risk score (0–100)

Classifies as Low / Medium / High risk

🌐 Full-Stack Web App

Frontend: React + Tailwind CSS

Backend: Flask + AI models

🧠 Tech Stack
Frontend

React (TypeScript)

Tailwind CSS

Vite

Backend

Python (Flask)

Whisper (Speech-to-Text)

CLIP (Image Moderation)

NLTK (Text Processing)

PyTorch

Deployment

Frontend: Vercel

Backend: Render (or scalable cloud services)

🏗️ Project Structure
mindguardai/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── uploads/
│
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── package.json
├── vite.config.ts
└── README.md
⚙️ How It Works

User uploads content (text/audio/image)

Backend processes input:

Audio → Whisper → Text → NLP

Image → CLIP → Risk detection

Text → NLP analysis

System generates:

Risk score

Category tags

Safe / Unsafe classification

UI displays:

Alerts

Blurred previews (for unsafe images)

Detailed explanation

🛠️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/mindguardai.git
cd mindguardai
2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
python app.py
3️⃣ Frontend Setup
npm install
npm run dev
4️⃣ Open App
http://localhost:5173
🌍 Deployment
Frontend

Deploy on Vercel

Backend

Deploy on Render / Hugging Face / AWS

⚠️ Limitations

Free cloud tiers have memory limits (ML models are heavy)

Whisper + CLIP cannot run together on low-memory instances

Requires service separation for production scaling

🔮 Future Improvements

🎥 Video moderation (frame extraction + audio analysis)

☁️ Microservices architecture for scalability

🔐 User authentication & dashboard

📊 Analytics for content safety trends

⚡ Optimized lightweight models

🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit PRs.

📌 Author

Mounika Sanaboyina
Computer Science (AI & Data Science)

⭐ Show Your Support

If you like this project, please ⭐ the repo!
