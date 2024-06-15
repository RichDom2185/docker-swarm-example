import express from "express";
import morgan from "morgan";
import { generateRandomUuid } from "./buildInfo" with { type: "macro" };

const app = express();
const PORT = parseInt(process.env.PORT || "8000");
const HOST = process.env.HOST || "localhost";

app.use(
  morgan(
    '[:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms'
  )
);

app.get("/", (_, res) => {
  const uuid = generateRandomUuid();
  res.json({
    buildId: uuid.uuid,
    generatedAt: uuid.timestamp,
  });
});

app.get("/health", (_, res) => {
  res.send("OK");
});

app.get("/echo/:message", (req, res) => {
  res.send(req.params.message);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
