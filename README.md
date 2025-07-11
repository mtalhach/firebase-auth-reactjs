# 🔥 Firebase Authentication App

A modern React application with Firebase authentication, built with Vite and Tailwind CSS.

## ✨ Features

- **User Authentication** - Sign up, sign in, password reset
- **Email Verification** - Required for account activation
- **Profile Management** - Update display name and email
- **Image Upload** - Profile pictures via Firebase Storage
- **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- Firebase project

### Installation

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd firebase-app
   npm install
   ```

2. **Configure Firebase**

   - Create Firebase project
   - Enable Authentication (Email/Password)
   - Enable Storage
   - Copy config to `src/firebase/config.jsx`

3. **Start development**
   ```bash
   npm run dev
   ```

## 📖 User Guide

### Creating Account

1. Go to `/signup`
2. Enter email and password (min 6 chars)
3. Check email for verification link
4. Click verification link to activate

### Signing In

1. Go to `/signin`
2. Enter email and password
3. Use eye icon to toggle password visibility
4. Click "Sign In"

### Password Reset

1. Click "Forgot password?" on signin page
2. Enter email address
3. Check email for reset link
4. Follow link to create new password

### Profile Management

- **Update Display Name**: Go to `/profile` → Edit name → Save
- **Update Email**: Enter new email → Verify → Complete
- **Upload Image**: Drag/drop or click to upload (max 5MB)

## 🔧 Development

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Run ESLint
```

### Project Structure

```
src/
├── components/
│   ├── Home.jsx          # Dashboard
│   ├── Profile.jsx       # Profile management
│   ├── SignIn.jsx        # Login
│   ├── signUp.jsx        # Registration
│   └── ResetPassword.jsx # Password reset
├── firebase/
│   └── config.jsx        # Firebase config
└── utils/
    └── ImageUpload.jsx   # File upload
```

### Routes

- `/` - Home/Dashboard (protected)
- `/signup` - User registration
- `/signin` - User login
- `/profile` - Profile settings (protected)
- `/reset-password` - Password reset

## 🛡️ Security

- Email verification required for profile access
- Password minimum 6 characters
- Recent login validation for sensitive operations
- File upload validation (images only, max 5MB)

## 🔍 Troubleshooting

### Common Issues

- **Email not verified**: Check spam folder, use resend button
- **Can't sign in**: Verify email, check credentials
- **Email update fails**: Sign out and sign back in
- **Upload fails**: Check file size (5MB max) and type (images only)

### Error Messages

- "Email already in use" → Use Sign In instead
- "Password too weak" → Use 6+ characters
- "Too many requests" → Wait a few minutes
- "Requires recent login" → Sign out and back in

## 📄 License

MIT License

---

**Built with React, Firebase, and Tailwind CSS**
