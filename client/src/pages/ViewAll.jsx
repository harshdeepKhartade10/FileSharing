import React from "react";
import { useLocation } from "react-router-dom";

const ViewAll = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const files = params.get("files")?.split(",") || [];

  return (
    <div>
      <h1>View Uploaded Files</h1>
      {files.length > 0 ? (
        files.map((file, index) => (
          <p key={index}>
            <a href={`https://your-s3-bucket-url/${file}`} target="_blank" rel="noopener noreferrer">
              View File {index + 1}
            </a>
          </p>
        ))
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default ViewAll;


// // client/src/pages/ViewAll.jsx
// import React from "react";
// import { useLocation } from "react-router-dom";
// import "../App.css";

// const ViewAll = () => {
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const filesParam = params.get("files");
//   const fileNames = filesParam ? filesParam.split(",") : [];

//   const bucketName = process.env.REACT_APP_BUCKET_NAME;
//   const region = process.env.REACT_APP_AWS_REGION;
//   const constructViewUrl = (fileName) =>
//     `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

//   return (
//     <div className="container">
//       <h1>All Uploaded Files</h1>
//       {fileNames.length === 0 ? (
//         <p>No files found.</p>
//       ) : (
//         fileNames.map((fileName, index) => (
//           <div key={index} className="file-item">
//             <p>File: {fileName}</p>
//             <p>
//               View URL:{" "}
//               <a
//                 href={constructViewUrl(fileName)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {constructViewUrl(fileName)}
//               </a>
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewAll;

// // client/src/pages/ViewAll.jsx
// import React from "react";
// import { useLocation } from "react-router-dom";
// import "../App.css";

// const ViewAll = () => {
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const filesParam = params.get("files");
//   const fileNames = filesParam ? filesParam.split(",") : [];

//   const bucketName = process.env.REACT_APP_BUCKET_NAME;
//   const region = process.env.REACT_APP_AWS_REGION;
//   const constructViewUrl = (fileName) =>
//     `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

//   return (
//     <div className="container">
//       <h1>All Uploaded Files</h1>
//       {fileNames.length === 0 ? (
//         <p>No files found.</p>
//       ) : (
//         fileNames.map((fileName, index) => (
//           <div key={index} className="file-item">
//             <p>File: {fileName}</p>
//             <p>
//               View URL:{" "}
//               <a
//                 href={constructViewUrl(fileName)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {constructViewUrl(fileName)}
//               </a>
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewAll;
