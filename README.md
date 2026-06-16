# MindGuardAI — Multi-Modal AI Content Moderation Platform

A full-stack AI-powered content moderation platform that analyzes text, audio, and image content to detect harmful, toxic, violent, NSFW, and unsafe material. MindGuardAI combines NLP, Speech AI, Computer Vision, and LLM reasoning into a unified moderation pipeline that generates explainable risk assessments and safety reports.

📦 **Repository:** https://github.com/Mouni-Sanaboyina/MindGuardAI

---

## Table of Contents

* Overview
* Features
* Technology Stack
* Moderation Pipeline
* System Architecture
* Project Structure
* Getting Started
* Environment Variables
* Deployment
* API Endpoints
* Key Highlights
* Future Enhancements
* Author

---

## Overview

MindGuardAI is a multi-modal content moderation platform designed to help digital platforms automatically detect unsafe content across multiple content types.

The system accepts text, audio, and image inputs and performs safety analysis using specialized AI models.

Instead of relying on a single classifier, MindGuardAI combines multiple AI systems:

* Detoxify for toxicity detection
* Whisper Large V3 for speech transcription
* BLIP for image understanding
* CLIP for visual classification
* NudeNet for NSFW detection
* GPT-4.1-mini for explainable moderation reasoning

The platform produces:

* Risk Score
* Category Breakdown
* Safety Classification
* Moderation Explanation
* Recommended Action

---

## Features

### Text Moderation

* Toxicity detection
* Hate speech detection
* Harassment detection
* Threat detection
* Obscene content detection
* Explainable moderation reports

### Audio Moderation

* Speech-to-text transcription
* Toxicity analysis on transcribed speech
* Harmful language detection
* Risk scoring

### Image Moderation

* Image caption generation
* NSFW content detection
* Adult content classification
* Violence assessment
* Dangerous activity detection
* Visual risk scoring

### Explainable AI

* Category-wise risk breakdown
* Human-readable moderation reasoning
* Confidence-based safety scoring
* Automated moderation recommendations

### Dashboard Features

* Text analysis
* Audio analysis
* Image analysis
* Risk score visualization
* Category breakdown charts
* Moderation history
* Real-time reports

---

## Technology Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* Vite

### Backend

* Python
* FastAPI
* Uvicorn

### AI Models

#### NLP

* Detoxify

#### Speech AI

* Whisper Large V3

#### Computer Vision

* BLIP
* CLIP
* NudeNet

#### LLM Reasoning

* Azure OpenAI GPT-4.1-mini

### Cloud Services

* Azure OpenAI
* Groq API

---

## Moderation Pipeline

### Text

Text Input

↓

Detoxify

↓

Toxicity Categories

↓

Risk Score

↓

Moderation Report

---

### Audio

Audio File

↓

Whisper Large V3

↓

Transcript

↓

Detoxify

↓

Risk Score

↓

Moderation Report

---

### Image

Image

↓

BLIP Caption Generation

↓

CLIP Visual Classification

↓

NudeNet NSFW Detection

↓

GPT-4.1-mini Reasoning

↓

Risk Score

↓

Moderation Report

---

## System Architecture

React Frontend

↓

FastAPI Backend

↓

Content Processing Layer

├── Detoxify

├── Whisper Large V3

├── BLIP

├── CLIP

└── NudeNet

↓

GPT-4.1-mini

↓

Risk Assessment Engine

↓

Safety Report

---

## Project Structure

MindGuardAI

├── backend

│ ├── services

│ │ ├── moderation_service.py

│ │ ├── clip_service.py

│ │ └── ai_service.py

│ │

│ ├── routes

│ ├── core

│ ├── models

│ └── main.py

│

├── frontend

│ ├── src

│ │ ├── components

│ │ ├── pages

│ │ ├── services

│ │ └── App.tsx

│

└── README.md

---

## Getting Started

### Prerequisites

* Python 3.10+
* Node.js 18+
* Azure OpenAI Account
* Groq API Key

### Clone Repository

```bash
git clone https://github.com/Mouni-Sanaboyina/MindGuardAI.git

cd MindGuardAI
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Create `.env`

```env
AZURE_OPENAI_API_KEY=

AZURE_OPENAI_ENDPOINT=

AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4.1-mini

GROQ_API_KEY=
```

Run Backend

```bash
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoints

### Text Moderation

POST /api/analyze/text

### Audio Moderation

POST /api/analyze/audio

### Image Moderation

POST /api/analyze/image

### Health Check

GET /api/health

---

## Key Highlights

✔ Multi-Modal AI Moderation

✔ NLP + Speech AI + Computer Vision

✔ Detoxify Integration

✔ Whisper Large V3 Integration

✔ BLIP Image Captioning

✔ CLIP Visual Classification

✔ NudeNet NSFW Detection

✔ GPT-4.1-mini Explainable Reasoning

✔ Automated Risk Scoring

✔ Real-Time Moderation Reports

✔ Full-Stack React + FastAPI Platform

---

## Future Enhancements

* Video moderation support
* Frame-level violence detection
* OCR-based text extraction
* Hate symbol detection
* Real-time streaming moderation
* RAG-powered policy explanations
* Human review workflow
* Analytics dashboard
* Multi-language moderation
* Enterprise moderation APIs

---

## Author

**Mounika Sanaboyina**

B.Tech – Computer Science (AI & Data Science)

GitHub:
https://github.com/Mouni-Sanaboyina

Project:
https://github.com/Mouni-Sanaboyina/MindGuardAI

---

If you found this project useful, consider giving the repository a ⭐ on GitHub.


