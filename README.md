# 📄 PDF → Word Converter (DocShift)

A modern, fast, and accurate **PDF to Word (.docx) converter** built using **Flask, pdfplumber, and python-docx** with a clean UI and seamless file conversion.

🌐 **Live Website:**
https://pdf-to-word-convertor-bvpo.onrender.com

---

# 🚀 Features

✅ Convert PDF to Word (.docx)
✅ Detect headings automatically
✅ Preserve formatting
✅ Convert tables
✅ Maintain alignment
✅ Drag & drop upload
✅ Modern UI
✅ No signup required
✅ Runs on your own server

---

# 🧠 How It Works

This project uses:

* **Flask** → Backend server
* **pdfplumber** → Extract text from PDF
* **python-docx** → Create Word documents
* **HTML/CSS/JS** → Frontend UI
* **Render** → Deployment

---

# 📂 Project Structure

```
pdf-to-word-converter/
│
├── app.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── main.js
```

---

# ⚙️ Backend (app.py) Explanation

## Flask App Setup

```
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024
```

This sets:

* Flask server
* 50MB upload limit

---

## Conversion Logic

### Heading Detection

```
def is_heading(text, font_size, avg_size):
```

This function:

* Detects headings
* Uses font size comparison
* Checks uppercase text

---

### Font Size Detection

```
def get_avg_font_size(page):
```

Calculates average font size to identify:

* Headings
* Paragraphs

---

### Alignment Detection

```
def detect_alignment(line_chars, page_width):
```

Detects:

* Left alignment
* Center alignment
* Right alignment

---

### Table Conversion

```
def add_table_to_doc(doc, table_data):
```

This:

* Extracts tables from PDF
* Converts them into Word tables

---

### Main Conversion Function

```
def convert_pdf_to_word(pdf_path, output_path):
```

This function:

1. Opens PDF
2. Extracts text
3. Detects headings
4. Detects alignment
5. Extracts tables
6. Creates Word file

---

# 🌐 Routes

## Home Route

```
@app.route('/')
```

Loads main UI page

---

## Convert Route

```
@app.route('/convert', methods=['POST'])
```

Handles:

* File upload
* Conversion
* Response

---

## Download Route

```
@app.route('/download/<uid>')
```

Handles:

* File download
* Generated docx

---

# 🎨 Frontend

## HTML (index.html)

Contains:

* Upload UI
* Convert button
* Progress bar
* Download button

---

## CSS (style.css)

Contains:

* Modern UI styling
* Responsive design
* Dark theme

---

## JavaScript (main.js)

Handles:

* File upload
* Drag & drop
* API calls
* Progress animation
* Download handling

---

# 🚀 Deployment

This project is deployed using **Render**

### Deployment Settings

Build Command:

```
pip install -r requirements.txt
```

Start Command:

```
gunicorn app:app
```

---

# 💻 Run Locally

### 1. Clone Repo

```
git clone https://github.com/YOUR-REPO
```

### 2. Install Requirements

```
pip install -r requirements.txt
```

### 3. Run App

```
python app.py
```

---

# 📦 Requirements

```
Flask
pdfplumber
python-docx
gunicorn
```

---

# 🔐 Security

* Files stored temporarily
* Auto deleted after conversion
* No user data stored

---

# ⚡ Performance

* Handles large PDFs (50MB)
* Fast conversion
* Server-side processing

---

# 🎯 Future Improvements

* OCR support
* Multi file upload
* PDF to PPT
* PDF to Excel
* AI formatting improvements

---

# 📜 License

This project is open source.

---

# 🙌 Acknowledgements

* Flask
* pdfplumber
* python-docx
* Render

---

# ⭐ Support

If you like this project:

⭐ Star the repo
⭐ Fork the repo
⭐ Share with others

---

# 🌐 Live Demo

https://pdf-to-word-convertor-bvpo.onrender.com

---

# 👨‍💻 Author

**Kushal Batra**
IIT Madras
BS in Data Science & Programming

GitHub:
https://github.com/YOUR-GITHUB-USERNAME

---
