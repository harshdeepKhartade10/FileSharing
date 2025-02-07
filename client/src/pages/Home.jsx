
// client/src/pages/Home.jsx
import React, { useState, useRef } from "react";
import { getUploadUrl, uploadFile, getViewUrl } from "../service/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  // Array to hold upload progress for each file.
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // For aggregated view URL when more than one file is uploaded.
  const [aggregatedViewUrl, setAggregatedViewUrl] = useState("");
  const fileInputRef = useRef();
  const navigate = useNavigate();

  // Helper: check if MIME type starts with "image/"
  const isImage = (mimeType) => mimeType.startsWith("image/");

  // Handle file selection.
  const onSelectFiles = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Local array to hold the keys (fileNames) from S3.
    const aggregatedFileNames = [];
    // Temporary state for tracking progress for each file.
    let updatedFiles = [];

    // Process files sequentially.
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Step 1: Request pre-signed upload URL (include file MIME type)
      const uploadData = await getUploadUrl(file.type);
      if (!uploadData) {
        console.error("Failed to get upload URL for", file.name);
        continue;
      }
      const { uploadUrl, fileName } = uploadData;
      aggregatedFileNames.push(fileName);

      // Create a file object for progress tracking.
      const fileObj = { fileName, fileType: file.type, viewUrl: "", progress: 0 };
      updatedFiles = [...updatedFiles, fileObj];
      setUploadedFiles(updatedFiles);

      // Step 2: Upload the file using the pre-signed URL.
      await uploadFile(uploadUrl, file, (percent) => {
        updatedFiles = updatedFiles.map((f) =>
          f.fileName === fileName ? { ...f, progress: percent } : f
        );
        setUploadedFiles(updatedFiles);
      });
      console.log("Upload complete for", file.name);

      // Step 3: Request the view URL (this will be used later)
      const viewUrl = await getViewUrl(fileName);
      updatedFiles = updatedFiles.map((f) =>
        f.fileName === fileName ? { ...f, viewUrl, progress: 100 } : f
      );
      setUploadedFiles(updatedFiles);
    }

    // If more than one file was selected, generate a single aggregated URL.
    if (selectedFiles.length > 1) {
      // Here we construct a URL to a dedicated "View All" page.
      // The aggregated URL contains a query parameter with all file names (comma-separated).
      const aggregatedURL = `/view-all?files=${aggregatedFileNames.join(",")}`;
      setAggregatedViewUrl(aggregatedURL);
    } else if (selectedFiles.length === 1 && updatedFiles.length > 0) {
      // For a single file, set the aggregated URL equal to the file's view URL.
      setAggregatedViewUrl(updatedFiles[0].viewUrl);
    }
  };

  // Trigger the hidden file input.
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <h1>File Sharing App</h1>
      <p>Select one or more files:</p>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onSelectFiles}
        accept="*/*"
        multiple
      />
      <button onClick={onButtonClick}>Select Files</button>

      {/* Show upload progress for each file */}
      {uploadedFiles.length > 0 && (
        <div className="upload-status">
          <h2>Upload Progress:</h2>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file-upload">
              <p>
                {file.fileName} ({isImage(file.fileType) ? "Image" : "File"})
              </p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${file.progress}%` }}></div>
              </div>
              {file.progress === 100 && (
                <p>
                  {/* In multi-upload mode, do not show individual URLs */}
                  {uploadedFiles.length === 1 && (
                    <>
                      View URL:{" "}
                      <a href={file.viewUrl} target="_blank" rel="noopener noreferrer">
                        {file.viewUrl}
                      </a>
                    </>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* If aggregatedViewUrl exists (i.e. multiple files), display a single link */}
      {aggregatedViewUrl && uploadedFiles.length > 1 && (
        <div className="aggregated-url">
          <h2>Combined File View URL</h2>
          <p>
            <a href={aggregatedViewUrl} target="_blank" rel="noopener noreferrer" >
              {aggregatedViewUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;// // client/src/pages/Home.jsx
// import React, { useState, useRef } from "react";
// import { getUploadUrl, uploadFile, getViewUrl } from "../service/api";
// import "../App.css";

// const Home = () => {
//   // Array to hold uploaded files info: each object has { viewUrl, fileName, fileType }
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const fileInputRef = useRef();

//   // Helper function to determine if a file is an image based on its MIME type
//   const isImage = (mimeType) => mimeType.startsWith("image/");

//   // When files are selected, process each file one by one
//   const onSelectFiles = async (e) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles || selectedFiles.length === 0) return;

//     // Use a temporary array to gather results from all files
//     const newUploadedFiles = [];
//     for (let i = 0; i < selectedFiles.length; i++) {
//       const file = selectedFiles[i];
      
//       // Step 1: Request a pre-signed upload URL from the backend,
//       // passing the file's MIME type as a query parameter
//       const uploadData = await getUploadUrl(file.type);
//       if (!uploadData) {
//         console.error("Failed to get upload URL for file:", file.name);
//         continue;
//       }
//       const { uploadUrl, fileName } = uploadData;

//       // Step 2: Upload the file to S3 using the pre-signed URL
//       const result = await uploadFile(uploadUrl, file);
//       console.log("Upload result for", file.name, ":", result);

//       // Step 3: Request a view URL to display or link to the file
//       const viewUrl = await getViewUrl(fileName);
//       if (viewUrl) {
//         newUploadedFiles.push({ viewUrl, fileName, fileType: file.type });
//       } else {
//         console.error("Failed to get view URL for file:", file.name);
//       }
//     }
    
//     // Append the new uploaded files to the state
//     setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
//   };

//   // Opens the hidden file input when the button is clicked
//   const onButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="container">
//       <h1>File Sharing App</h1>
//       <p>Select any files (images, PDFs, etc.) to upload to S3:</p>
      
//       {/* Allow multiple file selection */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={onSelectFiles}
//         accept="*/*"
//         multiple
//       />
//       <button onClick={onButtonClick}>Select Files</button>
      
//       {uploadedFiles.length > 0 && (
//         <div>
//           <h2>Uploaded Files:</h2>
//           {uploadedFiles.map((file, index) => (
//             <div key={index} style={{ marginBottom: "1.5rem" }}>
//               {isImage(file.fileType) ? (
//                 <img src={file.viewUrl} alt="Uploaded" width="300" />
//               ) : (
//                 <p>File: {file.fileName}</p>
//               )}
//               <p>
//                 View URL:{" "}
//                 <a href={file.viewUrl} target="_blank" rel="noopener noreferrer">
//                   {file.viewUrl}
//                 </a>
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


// client/src/pages/Home.jsx
// import React, { useState, useRef } from "react";
// import { getUploadUrl, uploadFile, getViewUrl } from "../service/api";
// import "../App.css";

// const Home = () => {
//   const [viewUrl, setViewUrl] = useState("");
//   const [fileName, setFileName] = useState("");
//   const fileInputRef = useRef();

//   const onSelectFile = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     // Step 1: Request a pre-signed upload URL from the backend
//     const uploadData = await getUploadUrl(selectedFile.type);
//     if (!uploadData) {
//       console.error("Failed to get upload URL");
//       return;
//     }
//     const { uploadUrl, fileName } = uploadData;
//     setFileName(fileName);

//     // Step 2: Upload the file to S3 using the pre-signed URL
//     const result = await uploadFile(uploadUrl, selectedFile);
//     console.log("Upload result:", result);

//     // Step 3: Request a view URL to display or link to the file
//     const url = await getViewUrl(fileName);
//     if (url) {
//       setViewUrl(url);
//     } else {
//       console.error("Failed to get view URL");
//     }
//   };

//   const onButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="container">
//       <h1>File Sharing App</h1>
//       <p>Select any file (image, PDF, etc.):</p>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={onSelectFile}
//         // Allow all file types
//         accept="*/*"
//       />
//       <button onClick={onButtonClick}>Select File</button>
//       {viewUrl && (
//         <div>
//           <h2>Uploaded File:</h2>
//           {/* If the file is an image, display it; otherwise, show a generic message */}
//           {selectedFileIsImage(viewUrl) ? (
//             <img src={viewUrl} alt="Uploaded" width="300" />
//           ) : (
//             <p>Your file has been uploaded.</p>
//           )}
//           <p>
//             View URL:{" "}
//             <a href={viewUrl} target="_blank" rel="noopener noreferrer">
//               {viewUrl}
//             </a>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// // A helper function to guess if a URL is for an image based on its extension.
// // (This is a simple heuristic; you can improve it as needed.)
// const selectedFileIsImage = (url) => {
//   return /\.(jpg|jpeg|png|gif)$/i.test(url);
// };

// export default Home;


// // client/src/pages/Home.jsx
// import React, { useState, useRef } from "react";
// import { getUploadUrl, uploadFile, getViewUrl } from "../service/api";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const Home = () => {
//   // Array to hold upload progress for each file.
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   // For aggregated view URL when more than one file is uploaded.
//   const [aggregatedViewUrl, setAggregatedViewUrl] = useState("");
//   const fileInputRef = useRef();
//   const navigate = useNavigate();

//   // Helper: check if MIME type starts with "image/"
//   const isImage = (mimeType) => mimeType.startsWith("image/");

//   // Handle file selection.
//   const onSelectFiles = async (e) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles || selectedFiles.length === 0) return;

//     // Local array to hold the keys (fileNames) from S3.
//     const aggregatedFileNames = [];
//     // Temporary state for tracking progress for each file.
//     let updatedFiles = [];

//     // Process files sequentially.
//     for (let i = 0; i < selectedFiles.length; i++) {
//       const file = selectedFiles[i];

//       // Step 1: Request pre-signed upload URL (include file MIME type)
//       const uploadData = await getUploadUrl(file.type);
//       if (!uploadData) {
//         console.error("Failed to get upload URL for", file.name);
//         continue;
//       }
//       const { uploadUrl, fileName } = uploadData;
//       aggregatedFileNames.push(fileName);

//       // Create a file object for progress tracking.
//       const fileObj = { fileName, fileType: file.type, viewUrl: "", progress: 0 };
//       updatedFiles = [...updatedFiles, fileObj];
//       setUploadedFiles(updatedFiles);

//       // Step 2: Upload the file using the pre-signed URL.
//       await uploadFile(uploadUrl, file, (percent) => {
//         updatedFiles = updatedFiles.map((f) =>
//           f.fileName === fileName ? { ...f, progress: percent } : f
//         );
//         setUploadedFiles(updatedFiles);
//       });
//       console.log("Upload complete for", file.name);

//       // Step 3: Request the view URL (this will be used later)
//       const viewUrl = await getViewUrl(fileName);
//       updatedFiles = updatedFiles.map((f) =>
//         f.fileName === fileName ? { ...f, viewUrl, progress: 100 } : f
//       );
//       setUploadedFiles(updatedFiles);
//     }

//     // If more than one file was selected, generate a single aggregated URL.
//     if (selectedFiles.length > 1) {
//       // Here we construct a URL to a dedicated "View All" page.
//       // The aggregated URL contains a query parameter with all file names (comma-separated).
//       const aggregatedURL = `/view-all?files=${aggregatedFileNames.join(",")}`;
//       setAggregatedViewUrl(aggregatedURL);
//     } else if (selectedFiles.length === 1 && updatedFiles.length > 0) {
//       // For a single file, set the aggregated URL equal to the file's view URL.
//       setAggregatedViewUrl(updatedFiles[0].viewUrl);
//     }
//   };

//   // Trigger the hidden file input.
//   const onButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="container">
//       <h1>File Sharing App</h1>
//       <p>Select one or more files:</p>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={onSelectFiles}
//         accept="*/*"
//         multiple
//       />
//       <button onClick={onButtonClick}>Select Files</button>

//       {/* Show upload progress for each file */}
//       {uploadedFiles.length > 0 && (
//         <div className="upload-status">
//           <h2>Upload Progress:</h2>
//           {uploadedFiles.map((file, index) => (
//             <div key={index} className="file-upload">
//               <p>
//                 {file.fileName} ({isImage(file.fileType) ? "Image" : "File"})
//               </p>
//               <div className="progress-bar">
//                 <div className="progress" style={{ width: `${file.progress}%` }}></div>
//               </div>
//               {file.progress === 100 && (
//                 <p>
//                   {/* In multi-upload mode, do not show individual URLs */}
//                   {uploadedFiles.length === 1 && (
//                     <>
//                       View URL:{" "}
//                       <a href={file.viewUrl} target="_blank" rel="noopener noreferrer">
//                         {file.viewUrl}
//                       </a>
//                     </>
//                   )}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* If aggregatedViewUrl exists (i.e. multiple files), display a single link */}
//       {aggregatedViewUrl && uploadedFiles.length > 1 && (
//         <div className="aggregated-url">
//           <h2>Combined File View URL</h2>
//           <p>
//             <a href={aggregatedViewUrl} target="_blank" rel="noopener noreferrer" >
//               {aggregatedViewUrl}
//             </a>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

