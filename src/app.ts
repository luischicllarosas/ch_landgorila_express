import express, { Request, Response } from "express";
import { router } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
// Create a new express application instance

const app = express();

app.use(cors());
// app.set("trust proxy", true);
// Set the network port
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});
