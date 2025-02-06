
// client/src/service/api.js
// import axios from "axios";

// const API_URI = "http://localhost:8000";

// export const getUploadUrl = async () => {
//   try {
//     const res = await axios.get(`${API_URI}/upload-url`);
//     // Expects { uploadUrl, fileName } from backend
//     return res.data;
//   } catch (err) {
//     console.error("Error in getUploadUrl", err);
//     return null;
//   }
// };

// export const getViewUrl = async (fileName) => {
//   try {
//     const res = await axios.get(`${API_URI}/view-url?fileName=${fileName}`);
//     // Expects { viewUrl } from backend
//     return res.data.viewUrl;
//   } catch (err) {
//     console.error("Error in getViewUrl", err);
//     return null;
//   }
// };

// export const uploadFile = async (uploadUrl, file) => {
//   try {
//     // Use the file's actual content type from the browser
//     const res = await axios.put(uploadUrl, file, {
//       headers: { "Content-Type": file.type },
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error in uploadFile", err);
//     return null;
//   }
// };

// client/src/service/api.js
// import axios from "axios";

// const API_URI = "http://localhost:8000";

// // Get the upload URL (now passing fileType as a query parameter)
// export const getUploadUrl = async (fileType) => {
//   try {
//     const res = await axios.get(`${API_URI}/upload-url?fileType=${encodeURIComponent(fileType)}`);
//     // Expected response: { uploadUrl, fileName }
//     return res.data;
//   } catch (err) {
//     console.error("Error in getUploadUrl", err);
//     return null;
//   }
// };

// // Get the view URL for a file
// export const getViewUrl = async (fileName) => {
//   try {
//     const res = await axios.get(`${API_URI}/view-url?fileName=${fileName}`);
//     // Expected response: { viewUrl }
//     return res.data.viewUrl;
//   } catch (err) {
//     console.error("Error in getViewUrl", err);
//     return null;
//   }
// };

// // Upload a file using the provided pre-signed URL
// export const uploadFile = async (uploadUrl, file) => {
//   try {
//     const res = await axios.put(uploadUrl, file, {
//       headers: { "Content-Type": file.type },
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error in uploadFile", err);
//     return null;
//   }
// };

// client/src/service/api.js
import axios from "axios";

const API_URI = "http://localhost:8000";

// Get the upload URL (passing fileType as a query parameter)
export const getUploadUrl = async (fileType) => {
  try {
    const res = await axios.get(`${API_URI}/upload-url?fileType=${encodeURIComponent(fileType)}`);
    // Expected response: { uploadUrl, fileName }
    return res.data;
  } catch (err) {
    console.error("Error in getUploadUrl", err);
    return null;
  }
};

// Get the view URL for a file (returns a public URL)
export const getViewUrl = async (fileName) => {
  try {
    const res = await axios.get(`${API_URI}/view-url?fileName=${fileName}`);
    // Expected response: { viewUrl }
    return res.data.viewUrl;
  } catch (err) {
    console.error("Error in getViewUrl", err);
    return null;
  }
};

// Upload a file using the provided pre-signed URL, with onUploadProgress callback support
export const uploadFile = async (uploadUrl, file, onProgress) => {
  try {
    const res = await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(percentCompleted);
        }
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error in uploadFile", err);
    return null;
  }
};
