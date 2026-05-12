# LocalConnect 🛠️

> A hyperlocal platform connecting skilled workers with users across India.

![LocalConnect](https://img.shields.io/badge/Project-LocalConnect-black?style=flat-square)
![HTML](https://img.shields.io/badge/HTML-5-orange?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-3-blue?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square)

---

## 🌍 Problem Statement

Millions of skilled workers in India — plumbers, electricians, tailors, carpenters — have no online presence. At the same time, users struggle to find trusted, nearby workers. LocalConnect bridges this gap by giving workers a **free digital identity** and helping users across India find help instantly.

---

## ✨ Features

- **Worker Discovery** — Search and filter workers by skill, city, and area across 50+ Indian cities
- **One-Click WhatsApp Contact** — Connect directly with a pre-filled message
- **Worker Registration** — Free profile creation for local workers pan-India
- **Dashboard** — Visual stats with bar charts showing platform activity
- **Responsive Design** — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Frontend   | HTML5, CSS3, Vanilla JS |
| Hosting    | GitHub Pages / Vercel |
| Design     | Custom CSS, Google Fonts |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shrutipanjiyara/localconnect.git
cd localconnect
```

### 2. Add your API key
Open `js/app.js` and find the `askAI()` function. Add your AI API key:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_API_KEY_HERE"
}
```

> ⚠️ Never commit your API key to GitHub. Use environment variables in production.

### 3. Open in browser
```bash
# Simply open index.html in your browser
open index.html
```

---

## 📁 Project Structure

```
localconnect/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── data.js         # Workers data
│   └── app.js          # Application logic
└── README.md
```

---

## 🌐 Live Demo

[View Live →](https://shrutipanjiyara.github.io/localconnect)

---

## 🎯 Social Impact

- Provides **free digital presence** to unorganized sector workers
- Reduces dependency on word-of-mouth for finding skilled help
- Empowers workers in **Tier 2 and Tier 3 cities** of India
- Built with accessibility and simplicity in mind — no app download required

---

## 🔮 Future Scope

- [ ] Firebase integration for real-time worker database
- [ ] User reviews and rating system
- [ ] Location-based search using Google Maps API
- [ ] SMS notifications for new job requests
- [ ] Multi-language support (Hindi, English)
- [ ] Worker verification system

---

## 👩‍💻 Author

Made by **[Shruti Panjiyara]**

- GitHub: [@shrutipanjiyara](https://github.com/shrutipanjiyara)
- LinkedIn: [Shruti Panjiyara](https://linkedin.com/in/shrutipanjiyara)

---


