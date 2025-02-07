
// server/s3.js
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import crypto from "crypto";
import { promisify } from "util";

dotenv.config();
const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKETNAME;
const accessKeyId = process.env.AWS_ACCESSKEYID;
const secretAccessKey = process.env.AWS_SECRETACCESSKEY;

const s3 = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

// Generate a pre-signed URL for uploading the file (PUT)
// Now accepts a fileType parameter (e.g. "image/jpeg", "application/pdf")
export const generateUploadUrl = async (fileType) => {
  const bytes = await randomBytes(16);
  const fileName = bytes.toString("hex"); // You may append an extension if desired

  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType, // use the file's MIME type
  });

  // URL expires in 60 seconds
  const uploadUrl = await getSignedUrl(s3, putCommand, { expiresIn: 60 });
  return { uploadUrl, fileName };
};

// Generate a "short" view URL by constructing the public URL
// (This requires that your S3 bucket objects are publicly readable.)
export const generateViewUrl = async (fileName) => {
  // A typical public URL format (adjust if using a custom domain or CloudFront)
  const viewUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
  return viewUrl;
};
// import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import { promisify } from "util";

// dotenv.config();
// const randomBytes = promisify(crypto.randomBytes);

// const region = process.env.AWS_REGION;
// const bucketName = process.env.AWS_BUCKETNAME;
// const accessKeyId = process.env.AWS_ACCESSKEYID;
// const secretAccessKey = process.env.AWS_SECRETACCESSKEY;

// const s3 = new S3Client({
//   region,
//   credentials: { accessKeyId, secretAccessKey },
// });

// // Generate a pre-signed URL for uploading the file (PUT)
// export const generateUploadUrl = async () => {
//   const bytes = await randomBytes(16);
//   const fileName = bytes.toString("hex"); // You can append an extension if needed

//   const putCommand = new PutObjectCommand({
//     Bucket: bucketName,
//     Key: fileName,
//     // We'll let the client provide the Content-Type on upload,
//     // but you can set a default here if needed:
//     ContentType: "image/jpeg",
//   });

//   // URL expires in 60 seconds
//   const uploadUrl = await getSignedUrl(s3, putCommand, { expiresIn: 60 });
//   return { uploadUrl, fileName };
// };

// // Generate a pre-signed URL for viewing the file (GET)
// export const generateViewUrl = async (fileName) => {
//   const getCommand = new GetObjectCommand({
//     Bucket: bucketName,
//     Key: fileName,
//   });

//   // URL valid for 300 seconds (5 minutes)
//   const viewUrl = await getSignedUrl(s3, getCommand, { expiresIn: 300 });
//   return viewUrl;
// };


// // server/s3.js
// import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import { promisify } from "util";

// dotenv.config();
// const randomBytes = promisify(crypto.randomBytes);

// const region = process.env.AWS_REGION;
// const bucketName = process.env.AWS_BUCKETNAME;
// const accessKeyId = process.env.AWS_ACCESSKEYID;
// const secretAccessKey = process.env.AWS_SECRETACCESSKEY;

// const s3 = new S3Client({
//   region,
//   credentials: { accessKeyId, secretAccessKey },
// });

// // Generate a pre-signed URL for uploading the file (PUT)
// // Now accepts a fileType parameter (e.g. "image/jpeg", "application/pdf")
// export const generateUploadUrl = async (fileType) => {
//   const bytes = await randomBytes(16);
//   const fileName = bytes.toString("hex"); // You may append an extension if desired

//   const putCommand = new PutObjectCommand({
//     Bucket: bucketName,
//     Key: fileName,
//     ContentType: fileType, // use the file's MIME type
//   });

//   // URL expires in 60 seconds
//   const uploadUrl = await getSignedUrl(s3, putCommand, { expiresIn: 60 });
//   return { uploadUrl, fileName };
// };

// // Generate a "short" view URL by constructing the public URL
// // (This requires that your S3 bucket objects are publicly readable.)
// export const generateViewUrl = async (fileName) => {
//   // A typical public URL format (adjust if using a custom domain or CloudFront)
//   const viewUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
//   return viewUrl;
// };
