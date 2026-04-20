import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../db.js";

dotenv.config();

const router = express.Router();

/*
  LOGIN / REGISTER
  Phone based (student / owner)
*/
router.post("/login", async (req, res) => {
  const { phone, role } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone required" });
  }

  const [rows] = await db.query(
    "SELECT * FROM users WHERE phone = ?",
    [phone]
  );

  let user;

  if (rows.length === 0) {
    const [result] = await db.query(
      "INSERT INTO users (phone, role) VALUES (?, ?)",
      [phone, role || "user"]
    );

    user = {
      id: result.insertId,
      phone,
      role: role || "user",
    };
  } else {
    user = rows[0];
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, user });
});

export default router;