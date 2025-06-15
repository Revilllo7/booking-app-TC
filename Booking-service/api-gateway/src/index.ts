import express from "express";
import routes from "./routes";

const app = express();
const PORT = 3000;

// Log all incoming requests (add at the top, after express() is created)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Only use express.json() for non-proxy routes if needed
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});