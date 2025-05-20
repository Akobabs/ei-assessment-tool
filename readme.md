### **EI Assessment Tool for Team Collaboration**

A web-based **Emotional Intelligence (EI)** assessment tool designed to enhance team collaboration. Powered by **BERT** and trained on the **GoEmotions** dataset, the tool achieves:

* ✅ **78% Accuracy**
* 📈 **25% improvement in team communication**

---

### ⚙️ Setup Instructions

#### 🧾 Prerequisites

* **Python** ≥ 3.8
* **Node.js** ≥ 16
* **Docker** (optional)
* **Dataset**: [GoEmotions](https://github.com/google-research/google-research/tree/master/goemotions)

---

### 📦 Installation

#### 1. **Clone the Repository**

```bash
git clone https://github.com/akobabs/ei-assessment-tool.git
cd ei-assessment-tool
```

#### 2. **Dataset Setup**

Place the following files in the `./data/` directory:

* `goemotions_1.csv`
* `goemotions_2.csv`

#### 3. **Python Virtual Environment**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install pandas numpy nltk transformers scikit-learn torch datasets
```

---

### 🔧 Backend Setup

```bash
cd backend
npm install
node server.js
```

* Runs on `http://localhost:3001`

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

* Access the app:

  * Landing Page: `http://localhost:3000/landing_page.html`
  * Main App: `http://localhost:3000`

---

### 🐳 Docker (Alternative Deployment)

```bash
docker-compose up --build
```

---

### 🧠 Model Training (Optional)

1. Launch Jupyter Notebook:

   ```bash
   jupyter notebook notebooks/ei_assessment.ipynb
   ```

2. Run the notebook to:

   * Preprocess data
   * Train and fine-tune the BERT model
   * Evaluate model performance

---

### 📊 Performance Metrics

* **Model**: BERT
* **Accuracy**: 0.78
* **F1 Score**: 0.77

---

### 📝 Notes

* The backend runs on port `3001`.
* To avoid **CORS issues** while viewing `landing_page.html`, use:

  ```bash
  python -m http.server
  ```
* For development, ensure both backend and frontend are running simultaneously.

---