
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

// server/server.js
import express from "express";
import routes from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

app.listen(8000, () => console.log("Server started on port 8000"));
