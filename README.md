# 🔥 Firebase Authentication App

A modern React application with Firebase authentication, built with Vite and Tailwind CSS.

## ✨ Features

- **User Authentication** - Sign up, sign in, password reset
- **Google Sign-In** - Quick authentication with Google accounts
- **Email Verification** - Required for account activation
- **Profile Management** - Update display name, email, and password
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
   - Enable Authentication (Email/Password + Google)
   - Copy config to `src/firebase/config.jsx`

3. **Start development**
   ```bash
   npm run dev
   ```

## 📖 User Guide

### Creating Account

1. Go to `/signup`
2. Choose Google sign-in or email registration
3. For email: Enter email and password (min 6 chars)
4. Check email for verification link
5. Click verification link to activate

### Signing In

1. Go to `/signin`
2. Choose Google sign-in or email login
3. For email: Enter email and password
4. Use eye icon to toggle password visibility
5. Click "Sign In"

### Password Reset

1. Click "Forgot password?" on signin page
2. Enter email address
3. Check email for reset link
4. Follow link to create new password

### Profile Management

- **Update Display Name**: Go to `/profile` → Edit name → Save
- **Update Email**: Enter new email → Verify → Complete
- **Update Password**: Enter current password → New password → Confirm → Save

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
└── App.jsx               # Main app component
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
- Re-authentication required for email and password changes
- Google accounts are automatically verified

## 🔍 Troubleshooting

### Common Issues

- **Email not verified**: Check spam folder, use resend button
- **Can't sign in**: Verify email, check credentials
- **Email update fails**: Sign out and sign back in
- **Password update fails**: Ensure current password is correct
- **Google sign-in blocked**: Allow pop-ups for the site

### Error Messages

- "Email already in use" → Use Sign In instead
- "Password too weak" → Use 6+ characters
- "Too many requests" → Wait a few minutes
- "Requires recent login" → Sign out and back in
- "Invalid credential" → Check current password
- "Pop-up blocked" → Allow pop-ups for this site

## 📄 License

MIT License

---

**Built with React, Firebase, and Tailwind CSS**
