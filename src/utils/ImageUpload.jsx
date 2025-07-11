import { useState, useRef } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageUpload = ({ onImageUpload, currentImageUrl, disabled = false }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setUploading(true);
    setUploadProgress(0);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileName = `profile-images/${timestamp}_${file.name}`;

      // Create storage reference
      const storageRef = ref(storage, fileName);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Call parent callback with the new URL
      onImageUpload(downloadURL);

      setUploadProgress(100);

      // Reset progress after a short delay
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Image Preview */}
      {currentImageUrl && (
        <div className="text-center">
          <div className="inline-block relative">
            <img
              src={currentImageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Current profile image</p>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          uploading
            ? "border-blue-300 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || uploading}
        />

        {uploading ? (
          <div className="space-y-3">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-blue-600 font-medium">Uploading image...</p>
            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <svg
              className="h-12 w-12 text-gray-400 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div>
              <p className="text-gray-600">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className="text-blue-600 hover:text-blue-700 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Click to upload
                </button>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
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

      {/* Upload Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Upload Instructions:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Supported formats: JPG, PNG, GIF</li>
          <li>• Maximum file size: 5MB</li>
          <li>• Recommended size: 400x400 pixels</li>
          <li>• Images will be automatically optimized</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
