import express from "express";
import { internships, Internship } from "../internship";

// Create a new router instance to define and handle routes specific to internships, allowing for modular route management
const router = express.Router();

router.post('/', (req, res) => {
    const newInternship: Internship = req.body;
    internships.push(newInternship);
    res.status(201).json({ message: "Internship submitted!" });
});

router.get('/', (req, res) => {
    res.json(internships);
});

export default router;