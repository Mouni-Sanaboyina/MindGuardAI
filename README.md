# 🛡️ MindGuard AI

### Multi-Modal Harmful Content Detection System

MindGuard AI is a multi-modal content moderation platform that automatically detects harmful content across **Text, Audio, and Images** using Machine Learning, Computer Vision, Speech AI, and Large Language Models.

The system is designed to assist social media platforms, online communities, educational platforms, and content-sharing applications in identifying toxic, unsafe, and inappropriate content before publication.

---

## 🚀 Features

### 📝 Text Moderation

* Toxicity Detection
* Hate Speech Detection
* Harassment Detection
* Profanity Analysis
* Threat Identification
* Risk Scoring

### 🎤 Audio Moderation

* Speech-to-Text using Whisper Large V3
* Toxicity Analysis on Transcribed Content
* Harmful Speech Detection
* Automated Moderation Reports

### 🖼️ Image Moderation

* NSFW Content Detection using NudeNet
* Image Caption Generation using BLIP
* Visual Content Understanding using CLIP
* GPT-based Risk Assessment
* Adult Content Detection
* Dangerous Activity Detection
* Violence Detection

---

## 🏗️ System Architecture

User Content
↓
Text / Audio / Image Upload
↓
AI Processing Pipeline
↓
Detoxify / Whisper / NudeNet / CLIP
↓
GPT-4.1-mini Risk Analysis
↓
Risk Score Generation
↓
Moderation Report

---

## 🧠 AI Models Used

| Component           | Technology       |
| ------------------- | ---------------- |
| Text Moderation     | Detoxify         |
| Speech Recognition  | Whisper Large V3 |
| Image Moderation    | NudeNet          |
| Image Understanding | CLIP             |
| Image Captioning    | BLIP             |
| AI Reasoning        | GPT-4.1-mini     |
| Backend API         | FastAPI          |
| Frontend            | React + Vite     |

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Lucide Icons

### Backend

* FastAPI
* Python
* Pydantic

### AI & Machine Learning

* Detoxify
* PyTorch
* Transformers
* Whisper Large V3
* NudeNet
* BLIP
* CLIP
* Azure OpenAI

---

## 📂 Project Structure

```text
MindGuard-AI
│
├── backend
│   ├── core
│   ├── routers
│   ├── services
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/MindGuard-AI.git
cd MindGuard-AI
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Create a `.env` file:

```env
AZURE_OPENAI_API_KEY=your_key

AZURE_OPENAI_ENDPOINT=your_endpoint

AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4.1-mini

GROQ_API_KEY=your_groq_key
```

Run Backend:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 📊 Sample Output

```json
{
  "content_type": "text",
  "risk_score": 82,
  "risk_level": "high",
  "flagged": true,
  "recommended_action": "Block Content",
  "categories": {
    "hate_speech": 78,
    "harassment": 82,
    "violence": 12
  }
}
```

---

## 🎯 Applications

* Social Media Moderation
* Community Management
* Educational Platforms
* Content Review Systems
* Online Forums
* Enterprise Safety Monitoring
* User Generated Content Platforms

---

## 🔒 Security Note

API keys and credentials should never be committed to GitHub. Store all secrets using environment variables.

---

## 🌟 Future Enhancements

* Video Moderation
* Real-time Streaming Analysis
* Dashboard Analytics
* User Management
* Multi-language Support
* Human Review Workflow
* Explainable AI Reports

---

## 👩‍💻 Author

**Mounika Sanaboyina**

B.Tech – Computer Science (AI & Data Science)

Passionate about Machine Learning, AI Systems, NLP, Computer Vision, and Responsible AI.

---

## 📜 License

This project is intended for educational, research, and demonstration purposes.
