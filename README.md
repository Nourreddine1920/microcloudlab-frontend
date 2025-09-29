# MicroCloudLab - Cloud-Native Embedded Development Platform

MicroCloudLab is a full-stack web application designed to revolutionize embedded systems development by providing a cloud-native Integrated Development Environment (IDE). It allows users to write, compile, and simulate microcontroller code directly in their browser, eliminating the need for physical hardware and complex toolchain setups.

This repository contains both the frontend and backend components of the MicroCloudLab platform.

## ✨ Features

### Frontend (React + Vite)
- **Interactive IDE:** A rich, browser-based IDE for writing and managing embedded projects.
- **Hardware Simulation:** Real-time simulation of microcontroller behavior, including serial monitor and virtual oscilloscope.
- **Visual Configuration Tools:** Intuitive dashboards for configuring peripherals, assigning pins, and validating setups.
- **Collaborative Features:** Team-based project management and real-time code collaboration.
- **Responsive Design:** Fully responsive interface built with TailwindCSS for a seamless experience on any device.
- **Comprehensive Component Library:** A well-documented library of reusable UI components.

### Backend (Django + DRF)
- **RESTful API:** A robust API built with Django REST Framework to manage projects, users, configurations, and microcontrollers.
- **Microcontroller Management:** Endpoints for listing, creating, and managing cloud-hosted microcontrollers.
- **User & Project Management:** Secure handling of user profiles, projects, and collaborative access.
- **Peripheral Communication Gateway:** A generic endpoint to simulate receiving data from various peripheral types.
- **Extensible Data Models:** A well-defined database schema to support all platform features, from tutorials to case studies.

## 📁 Project Structure

The repository is organized into two main directories:

```
.
├── microcloudlab/         # React Frontend Application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.mjs
└── microcloudlab-backend/ # Django Backend Application
    ├── api/               # Core API application
    ├── backend/           # Django project settings
    ├── db.sqlite3
    └── manage.py
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **Python** (v3.10 or higher)
- **pip** (Python package installer)

## 🛠️ Setup and Installation

Follow these steps to get both the frontend and backend development environments running.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd microcloudlab-backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For Unix/macOS
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install Python dependencies:**
    *(Note: A `requirements.txt` file is not included. You will need to install Django and other packages manually.)*
    ```bash
    pip install Django djangorestframework django-cors-headers
    ```

4.  **Apply database migrations:**
    ```bash
    python manage.py migrate
    ```

5.  **Start the backend development server:**
    ```bash
    python manage.py runserver
    ```
    The backend API will be available at `http://localhost:8000`.

### Frontend Setup

1.  **Open a new terminal window.**

2.  **Navigate to the frontend directory:**
    ```bash
    cd microcloudlab
    ```

3.  **Install npm dependencies:**
    ```bash
    npm install
    ```

4.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The frontend application will be available at `http://localhost:5173`.

## 🚀 Usage

Once both servers are running, you can access the platform by opening `http://localhost:5173` in your web browser.

- **Explore the Homepage:** Learn about the platform's features and user journeys.
- **Use the Platform Demo:** Interact with a simulated IDE to see how the code editor, project explorer, and monitoring tools work.
- **Access the IDE:** Navigate to `/ide` to select a microcontroller and start configuring peripherals using the visual dashboards and editors.

---

This README provides a comprehensive guide for new developers. For more detailed information, please refer to the docstrings and comments added throughout the source code.