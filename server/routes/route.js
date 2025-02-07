// server/routes/route.js
import express from "express";
import { getUploadUrlController, getViewUrlController } from "../controller/image-controller.js";

const router = express.Router();

router.get("/upload-url", getUploadUrlController);
router.get("/view-url", getViewUrlController);

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
