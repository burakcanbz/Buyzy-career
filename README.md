# Buyzy Career 
[Live Demo](https://buyzycareer.onrender.com)

**Important Note:** Auth is provided for Android devices, Chrome, and Mozilla.  
iOS devices and Safari have limitations regarding cross-site cookies due to [Intelligent Tracking Prevention](https://www.apple.com/safari/docs/Safari_White_Paper_Nov_2019.pdf).

Buyzy Career is a modern career portal where candidates can explore job opportunities and easily submit their applications. Only **Careers - Jobs page and its related pages reachable**. Other pages just added for better view.

## Features

### Overview
- **Modern Career Portal** – Candidates can browse job openings, view details, upload their resumes, and apply easily.  
- **Application Management** – Each application is securely stored and linked to a specific division for better organization.  
- **Admin Panel** – A dedicated `/admin-panel` route allows admins to manage positions and applications.  
- **Secure Access** – Only predefined admins can access the panel; no public registration is available.  

---

### Admin Roles & Permissions

#### **Owner**
- Full access to all divisions and data.  
- Can create, edit, delete, and update job positions.  
- Can review applications, leave feedback, and hire candidates.  

#### **Editor**
- Access limited to assigned divisions.  
- Can view and manage applications within their divisions.  
- Can leave feedback.  

#### **Viewer**
- Read-only access to assigned divisions.  
- Can view job positions and applications but cannot edit or leave feedback.  

---

### Additional Highlights
- **File Upload Support** – Candidates can attach resumes or additional documents to their applications.  
- **Division-Based Filtering** – Admins only see data related to their assigned divisions.  
- **Role-Based UI** – Interface dynamically adapts to each admin’s permissions.  
- **Scalable Architecture** – Codebase is modular and easy to extend for future enhancements.  

---

## 🧠 Tech Stack
- **Frontend:** React, MUI, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **State Management:** Redux Toolkit 
- **File Upload:** Multer  
- **Authentication:** JWT-based admin login  

***
You can reach the controller panel as an editor following these steps:
https://buyzycareer.onrender.com

email: jane@gmail.com
password: buyzy!editor25
***

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- **Concurrently** (installed automatically as a dev dependency)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/burakcanbz/Buyzy-career.git
   cd project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd client
   npm install
   ```

---

## Available Scripts

The following scripts are defined in the `package.json` file for managing and running the project:

### **Start the backend server**
```bash
npm run server
```
- Runs the backend server using `nodemon`, which automatically restarts the server on file changes.
- Backend entry point: `api/app.js`.

### **Start the frontend client**
```bash
npm run client
```
- Starts the React development server.
- React entry point: `client/src/index.js`.

### **Run the project in development mode**
```bash
npm run dev
```
- Runs both the backend and frontend servers concurrently using the `concurrently` package.

### **Start the production server**
```bash
npm start
```
- Starts the backend server without `nodemon`.
- Note: Ensure the React app is built (`npm run build` in `client`).

---

### Running the Seeder Script
1. Ensure the backend server is properly configured and connected to the database.
2. Execute the `seeder.js` file:
3. 
   ```bash
   node api/seeder.js
   ```
4. This will read the user Template.json file from the data folder, hash the passwords, and populate the users.json file with the user data.
5. You can add any user data with the correct form to userTemplate.json file and populate them to users.json file using seeder.js fil.
---

## Admin Panel Features
- Admin users can be directed to the login page of Admin Panel to access the application with http://localhost:5000/admin-panel path.
- Only users with **admin accounts** can access the application.  
- Role-based access control to ensure security.  
- Unauthorized access is strictly prevented.  

## Running the Application

1. **Development Mode**:
   Use `npm run dev` to start both the backend and frontend servers.  
   The frontend will run on `http://localhost:5000` and API requests to the backend at `http://localhost:3000`.

2. **Production Mode**:
   Build the frontend for production:
   ```bash
   npm run build --prefix client
   ```
   Then start the backend:
   ```bash
   npm start
   ```
   The backend will serve the frontend static files and APIs from `http://localhost:3000`.

---

## Key Points

- **Backend**:  
  The backend API is built with **Express.js**. Define routes in the `api/routes` folder and connect to your database in the `api/models` folder.

- **Frontend**:  
  The frontend is built with **React.js**. Create components in the `client/src` folder and manage state using **React hooks**/**redux**.

---

## Contributing
Feel free to fork the repository, make changes, and submit pull requests.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.


