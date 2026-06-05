# 🏥 Hospital IoT Telemetry System

An enterprise-grade, real-time healthcare monitoring solution. This system simulates patient vitals, leverages GPT-4 for clinical anomaly detection, and provides a modern web dashboard for medical staff.

---

## 🏗️ System Architecture

The project is structured into three primary components:

1.  **/frontend**: A Next.js 14 (App Router) application.
    - Features: Real-time telemetry charts (Recharts), Firebase Auth (Email/Google), and System Control Panel.
2.  **/simulator**: A Python-based medical data generator.
    - Function: Pushes live vitals (HR, SpO2, BP, Temp) to Firebase Realtime Database.
3.  **/agent**: An AI-driven anomaly detection engine.
    - Function: Monitors vitals, detects emergencies, and calls GPT-4 for clinical explanations and recommendations.

---

## 🛠️ Local Setup Guide

### 1. Prerequisites
- **Node.js 18+** & **npm**
- **Python 3.10+**
- A **Firebase Project** (RTDB + Firestore + Auth enabled)
- An **OpenAI API Key**

### 2. Environment Configuration

#### Frontend (/frontend/.env.local)
Create this file and add your Firebase Web SDK credentials:
`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_rtdb_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
`

#### Backends (/agent/.env and /simulator/.env)
Add your OpenAI key and RTDB URL to both folders:
`env
OPENAI_API_KEY=sk-proj-your_key
FIREBASE_DB_URL=your_rtdb_url
`
*Note: Also place your irebase_config.json (Service Account Key) in both the /agent and /simulator directories.*

### 3. Installation

**Frontend:**
`ash
cd frontend
npm install
`

**Simulator:**
`ash
cd simulator
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
`

**AI Agent:**
`ash
cd agent
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
`

---

## 🚀 Running the System

1.  **Start Frontend:** In the /frontend directory, run 
pm run dev. Access at http://localhost:3000.
2.  **Start Simulator:** In the /simulator directory, run .\venv\Scripts\python simulator.py.
3.  **Start AI Agent:** In the /agent directory, run .\venv\Scripts\python agent.py.

**Tip:** You can also use the **"System Control"** buttons in the web dashboard sidebar to start/stop the Simulator and Agent remotely once the frontend is running!

---

## ✨ Key Features
- **Live Mini-Graphs:** View real-time HR trends for all 10 patients simultaneously on the dashboard.
- **AI Clinical Insights:** Automatic GPT-4 analysis of patient vitals during emergencies.
- **Browser Alerts:** Immediate toast notifications for critical medical violations.
- **Secure Onboarding:** Full Landing Page -> Signup -> Login flow.

---

*Built for Capgemini Healthcare Solutions.*
