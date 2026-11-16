![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)

![License](https://img.shields.io/github/license/YOUR_USERNAME/resume-analyzer)
![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/resume-analyzer)
![Live Demo](https://img.shields.io/badge/Live-Demo-success)

# 📄 Resume Analyzer

An AI-powered **resume analysis application** built with **React, TypeScript, Firebase Functions, and OpenAI**.  
Upload your PDF resume and receive intelligent feedback, resume insights, and improvement suggestions.

### 🔗 Live Demo
👉 [Live Demo](https://YOUR_PROJECT_ID.web.app)

---

## ✨ Features

- 📄 Upload PDF resumes
- 🤖 AI-powered resume analysis
- 🧠 Extract text from PDF files
- 📊 Resume feedback and suggestions
- ☁️ Firebase Functions backend
- 🔥 Firebase Hosting deployment
- ⚡ Fast frontend built with Vite
- 📱 Responsive UI

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Firebase Functions
- Express
- Multer

### AI & PDF Processing
- OpenAI API
- pdf-parse / pdfjs

### Deployment
- Firebase Hosting
- GitHub

---

## 📂 Project Structure

```txt
resume-analyzer/
│
├── functions/                  # Firebase backend
│
├── resume-analyzer-frontend/   # React frontend
│
├── firebase.json
└── README.md
```

---

## 📸 Screenshots

### Main Page

```md
Add your screenshot here:
screenshots/main-page.png
```

### Analysis Result

```md
Add your screenshot here:
screenshots/analysis-result.png
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/resume-analyzer.git
cd resume-analyzer
```

---

## ⚙️ Frontend Setup

```bash
cd resume-analyzer-frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## 🔥 Backend Setup

```bash
cd functions
npm install
firebase emulators:start
```

Firebase Emulator runs on:

```txt
http://localhost:5001
```

---

## 🔑 Environment Variables

Create a `.env` file inside:

```txt
functions/
```

Example:

```env
OPENAI_API_KEY=your_api_key
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5001/YOUR_PROJECT/us-central1/api
```

---

## ☁️ Firebase Deployment

Deploy frontend + backend:

```bash
firebase deploy
```

---

## 📱 Responsive Design

The application is optimized for:
- Desktop
- Tablet
- Mobile devices

---

## 📌 Future Improvements

- User authentication
- Resume history
- Multiple resume templates
- ATS score analysis
- Drag & drop upload
- Multi-language support

---

## 👨‍💻 Author

**Volodymyr Mandziuk**

GitHub:
https://github.com/YOUR_USERNAME

---

## 📄 License

This project is licensed under the MIT License.