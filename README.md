# MyAuthApp 🛡️

A Node.js authentication system using **OAuth2 (Google & GitHub)** with **JWT authentication** and **session-based login**.

## 📌 Features
✅ Google OAuth2 Authentication  
✅ GitHub OAuth2 Authentication  
✅ Secure session-based login  
✅ JSON Web Token (JWT) authentication  
✅ Express.js backend  
✅ User information retrieval  
✅ Logout functionality  

---

## 📦 Installation
### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/MyAuthApp.git
cd MyAuthApp
```

### 2️⃣ **Install Dependecies**
```bash
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a .env file in the root folder and add:
```bash
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# JWT Secret Key
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Running the Application
```bash
npm start
```
By default, the app runs on http://localhost:3000.

---

## 🔑 OAuth Authentication
### 🔹 Google Login
Go to http://localhost:3000/auth/google
You will be redirected to the Google login page.
After authentication, you will be redirected to the welcome page.
### 🔹 GitHub Login
Go to http://localhost:3000/auth/github
You will be redirected to the GitHub login page.
After authentication, you will be redirected to the welcome page.
### 🔹 Logout
Click the Logout button or go to http://localhost:3000/auth/logout.

---

## 🛠 Project Structure
```bash
MyAuthApp/
│── /config          # Passport.js OAuth configurations
│── /routes          # API Routes (Auth, Users)
│── /views           # Pug templates (if applicable)
│── /public          # Static files (CSS, JS, Images)
│── app.js           # Main Express app
│── package.json     # Project dependencies
│── .env             # Environment variables (ignored in Git)
│── .gitignore       # Files ignored by Git
│── README.md        # Documentation
```

## 📜 API Endpoints
### 1️⃣ Authentication Routes
- GET	/auth/google	Redirects to Google OAuth
- GET	/auth/google/callback	Handles Google OAuth callback
- GET	/auth/github	Redirects to GitHub OAuth
- GET	/auth/github/callback	Handles GitHub OAuth callback
- GET	/auth/logout	Logs the user out

### 2️⃣ User Information
- GET	/users/user	Returns authenticated user info

Example Response from /users/user:
``` bash
{
    "id": "108238467698661140948",
    "name": "John Doe",
    "email": "johndoe@example.com"
}
```
---

## 🛠 Dependencies
- Express.js - Web framework for Node.js
- Passport.js - Authentication middleware
- Google OAuth2 - Google authentication
- GitHub OAuth2 - GitHub authentication
- jsonwebtoken - JWT authentication
- express-session - Session management
- dotenv - Environment variable support

---

## 🔒 Security Considerations
- Always keep .env secret and never push it to GitHub.
- Use HTTPS in production.
- Consider refresh tokens for better security.
- Store sensitive data in a database instead of sessions.

---

## 🚀 Deployment
To deploy, use Heroku, Vercel, or Railway.




