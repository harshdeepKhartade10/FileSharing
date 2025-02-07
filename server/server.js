

// // server/server.js
// import express from "express";
// import routes from "./routes/route.js";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL, // Allow only frontend to access backend
//     credentials: true, // Allow cookies if needed
//   })
// );

// app.use(bodyParser.json());
// app.use("/", routes);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: "https://filesharing-harshdeep-khartade10.onrender.com",
    credentials: true
}));

app.use(express.json());

// Route to get file URLs
app.get('/view-url', async (req, res) => {
    const fileNames = req.query.fileName?.split(','); // Convert query to array
    if (!fileNames || fileNames.length === 0) {
        return res.status(400).json({ message: "No file names provided" });
    }

    console.log("Requested Files:", fileNames);

    try {
        const urls = fileNames.map(file => `https://webapp-harshal.s3.us-east-1.amazonaws.com/${file}`);
        res.json({ viewUrls: urls }); // Return array of URLs
    } catch (error) {
        console.error("Error generating file URLs:", error);
        res.status(500).json({ message: "Error fetching files" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// server/server.js
// import express from "express";
// import routes from "./routes/route.js";
// import cors from "cors";
// import bodyParser from "body-parser";

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use("/", routes);

// app.listen(8000, () => console.log("Server started on port 8000"));

// // server/server.js
// import express from "express";
// import routes from "./routes/route.js";
// import cors from "cors";
// import bodyParser from "body-parser";

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use("/", routes);

// app.listen(8000, () => console.log("Server started on port 8000"));
