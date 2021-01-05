import express from "express";
import path from "path";
import { config } from "dotenv";
config();

const app = express();

app.use(express.static(path.join(__dirname, "..", "..", "src", "assets")));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
