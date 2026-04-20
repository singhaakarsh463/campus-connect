import express from "express";
import { db } from "../db.js";

const router = express.Router();

/* ===============================
   ADD PROPERTY (OWNER / STUDENT)
================================ */
router.post("/add", async (req, res) => {
  const {
    owner_id,
    title,
    type,
    price,
    gender,
    address,
    near_university,
    lat,
    lng,
  } = req.body;

  await db.query(
    `INSERT INTO properties
    (owner_id, title, type, price, gender, address, near_university, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ST_GeomFromText(?))`,
    [
      owner_id,
      title,
      type,
      price,
      gender,
      address,
      near_university,
      `POINT(${lng} ${lat})`,
    ]
  );

  res.json({ message: "Property added successfully" });
});

/* ===============================
   SEARCH NEARBY PROPERTIES
================================ */
router.get("/search", async (req, res) => {
  const { lat, lng, type, maxRent } = req.query;

  const [rows] = await db.query(
    `
    SELECT *,
    ST_Distance_Sphere(
      location,
      ST_GeomFromText(?)
    ) AS distance
    FROM properties
    WHERE type = ?
      AND price <= ?
      AND is_available = TRUE
    HAVING distance < 5000
    ORDER BY distance
    `,
    [`POINT(${lng} ${lat})`, type, maxRent]
  );

  res.json(rows);
});

/* ===============================
   CONTACT OWNER / TENANT
================================ */
router.post("/lead", async (req, res) => {
  const { property_id, owner_id, user_phone, contact_type } = req.body;

  await db.query(
    `INSERT INTO leads
     (property_id, owner_id, user_phone, contact_type)
     VALUES (?, ?, ?, ?)`,
    [property_id, owner_id, user_phone, contact_type]
  );

  res.json({ message: "Contact recorded" });
});

export default router;