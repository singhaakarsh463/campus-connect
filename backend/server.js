import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.json({ message: "Backend is alive" });
});

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});

