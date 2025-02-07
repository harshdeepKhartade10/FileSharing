

// server/server.js
import express from "express";
import routes from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow only frontend to access backend
    credentials: true, // Allow cookies if needed
  })
);

app.use(bodyParser.json());
app.use("/", routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
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
