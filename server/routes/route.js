// server/routes/route.js
// import express from "express";
// import { getUploadUrlController, getViewUrlController } from "../controller/image-controller.js";

// const router = express.Router();

// router.get("/upload-url", getUploadUrlController);
// router.get("/view-url", getViewUrlController);



// export default router;

import express from "express";
import { getUploadUrlController, getViewUrlController } from "../controller/image-controller.js";

const router = express.Router();

router.get("/upload-url", getUploadUrlController);
router.get("/view-url", getViewUrlController);

// Add this to handle /view-all (optional)
router.get("/view-all", (req, res) => {
  res.status(200).send("View All Page - This should be handled in frontend.");
});

export default router;

// server/routes/route.js
// import express from "express";
// import { getUploadUrlController, getViewUrlController } from "../controller/image-controller.js";

// const router = express.Router();

// router.get("/upload-url", getUploadUrlController);
// router.get("/view-url", getViewUrlController);

// export default router;

// // server/routes/route.js
// import express from "express";
// import { getUploadUrlController, getViewUrlController } from "../controller/image-controller.js";

// const router = express.Router();

// router.get("/upload-url", getUploadUrlController);
// router.get("/view-url", getViewUrlController);

// export default router;
