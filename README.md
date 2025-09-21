# 🏡 Real Estate Wizard



> **Real Estate Wizard** is a DEMO of a modern web application that guides users step by step to find their dream property.
> Users can upload an inspirational image, describe what they are looking for, select a location on an interactive map, and adjust filters like price and number of rooms.

---

## ✨ Features
- **🖼️ Image Upload** – Let users show the style of house they want.
- **✍️ Description Field** – Accepts free text with location, style, and preferences.
- **🗺️ Interactive Map** – Select location by clicking directly on the map.
- **🎛️ Filter Step** – Adjust price range and minimum rooms.
- **✅ Confirmation Step** – Review selections before submitting.
- **🎨 Smooth Animations** – Built with **Framer Motion** for a modern feel.
- **📱 Responsive Design** – Looks great on desktop and mobile.


---

## 🛠️ Technologies Used

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

---

## 🚀 Development Setup

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run development server
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 3️⃣ Build for production
```bash
npm run build
```
This will create a `dist/` folder with optimized static files ready to deploy.

---

## 🧩 Project Structure
```bash
real-estate-wizard/
 ├── index.html
 ├── package.json
 ├── postcss.config.cjs
 ├── tailwind.config.cjs
 └── src/
     ├── App.jsx        # Main wizard component
     ├── main.jsx       # App entry point
     └── index.css      # Tailwind base styles
```

---

## 📊 Data Processing and AI Integration
This front-end, when collecting user data and pressing the **"Confirm and Search"** button, creates a JSON file with the data and prints it to the console.


This information can be used for:
- Sending to a backend service for further processing.
- Uploading the reference image to a cloud storage service or bucket.
- Using geolocation APIs to find nearby points of interest.
- Generating embeddings to perform semantic searches on existing property listings.
- Passing structured data to an LLM or RAG system for recommendations.

### Example API Payload
```json
{
  "descripcion": "casa amplia con jardin frontal",
  "archivo_imagen": "house2.jpg",
  "detalles": {
    "ubicacion": "9.96133, -84.08867",
    "precio_maximo": "150000",
    "habitaciones_minimas": 3
  }
}
```

---


## 💻 Running on Codespaces
You can **download or clone this repository** and run it on **GitHub Codespaces** for a cloud-based development experience.


```bash
git clone https://github.com/YOUR-USERNAME/real-estate-wizard.git
cd real-estate-wizard
code . # Open in VS Code or Codespaces
npm install && npm run dev
```


---

## 🎥 Demo & Screenshots
Screenshots of user flow:

<img width="1356" height="669" alt="Captura de pantalla 2025-09-17 222216" src="https://github.com/user-attachments/assets/742a99b1-9c09-4f3d-886b-bb7fb059c97f" />
<img width="1357" height="667" alt="Captura de pantalla 2025-09-17 222238" src="https://github.com/user-attachments/assets/53f33cd9-1ed8-4bcf-920a-5d488b84e9a1" />
<img width="1351" height="671" alt="Captura de pantalla 2025-09-17 222249" src="https://github.com/user-attachments/assets/ca00f576-4ab6-4983-9ada-02d17d20ae02" />
<img width="1354" height="674" alt="Captura de pantalla 2025-09-17 222300" src="https://github.com/user-attachments/assets/e70379a4-010b-4703-947f-771374c65231" />
<img width="666" height="481" alt="Captura de pantalla 2025-09-17 222409" src="https://github.com/user-attachments/assets/d6880607-6196-4b2a-abd4-549fea9931c4" />



---

## 🤝 Contributing
Feel free to open issues or submit pull requests to improve the project.

---

## 📜 License
MIT License — You are free to use, modify and distribute this project.

## Front-end Demo
https://react-real-estate-wizard.vercel.app/ 

You can adapt the sending of the JSON to an endpoint created for inference by adding a FETCH(method: 'POST') in the handleConfirmAndSearch() method and loading the image with formData.append("image", imageFile);
