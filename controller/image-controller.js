
// server/controller/image-controller.js
import { generateUploadUrl, generateViewUrl } from "../s3.js";

// Endpoint: GET /upload-url?fileType=<mime-type>
export const getUploadUrlController = async (req, res) => {
  try {
    // Default to "application/octet-stream" if no fileType is provided
    const fileType = req.query.fileType || "application/octet-stream";
    const { uploadUrl, fileName } = await generateUploadUrl(fileType);
    res.status(200).json({ uploadUrl, fileName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint: GET /view-url?fileName=<fileName>
export const getViewUrlController = async (req, res) => {
  try {
    const { fileName } = req.query;
    if (!fileName) {
      return res.status(400).json({ error: "fileName is required" });
    }
    const viewUrl = await generateViewUrl(fileName);
    res.status(200).json({ viewUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
