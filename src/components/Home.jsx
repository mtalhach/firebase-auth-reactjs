import { useState, useEffect } from "react";
import { app } from "../firebase/config";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setSuccess("Verification email sent! Please check your inbox.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error sending verification email:", error);
      setError("Failed to send verification email. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h1>
            <p className="text-gray-600 mb-6">
              Please sign in to access this page
            </p>
            <div className="space-y-3">
              <Link
                to="/signin"
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 transform hover:scale-[1.02]"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 transition duration-200 transform hover:scale-[1.02]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Firebase App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition duration-200 transform hover:scale-105"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You're successfully signed in with Firebase authentication. This is
            your protected home page.
          </p>
        </div>

        {/* Email Verification Notice */}
        {!user.emailVerified && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-2 text-center">
                Email Verification Required
              </h3>
              <p className="text-orange-800 text-center mb-4">
                Please verify your email address ({user.email}) to access your
                full profile and account information.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {success}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleResendVerification}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-700 transition duration-200"
                >
                  Resend Verification Email
                </button>
                <Link
                  to="/profile"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 text-center"
                >
                  Go to Profile
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* User Info Card - Only show if email is verified */}
        {user.emailVerified && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Account Information
            </h3>

            {/* Profile Image and Basic Info */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {user.displayName
                  ? user.displayName.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              {user.displayName && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">
                    Display Name:
                  </span>
                  <span className="text-gray-900">{user.displayName}</span>
                </div>
              )}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">User ID:</span>
                <span className="text-gray-900 text-sm font-mono">
                  {user.uid}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  Account Created:
                </span>
                <span className="text-gray-900">
                  {new Date(user.metadata.creationTime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Last Sign In:</span>
                <span className="text-gray-900">
                  {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="font-medium text-green-700">
                  Email Status:
                </span>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-700 font-medium">Verified</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/profile"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 transform hover:scale-105"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
