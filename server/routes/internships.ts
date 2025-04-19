import express from "express";
import { internships, Internship } from "../internship";

// Create a new router instance to define and handle routes specific to internships, allowing for modular route management
const router = express.Router();

router.post('/', (req: express.Request, res: express.Response): void => {
    const newInternship: Internship = req.body;

    const { company, position, pay, major, gpa, experience } = newInternship;

    if (
        !company ||
        !position ||
        typeof pay !== 'number' ||
        !major ||
        !gpa ||
        !experience
    ) {
        res.status(400).json({error: "All fields must be valid."});
    }

    internships.push(newInternship);
    res.status(201).json({ message: "Internship submitted!" });
});

router.get('/', (req, res) => {
    const { major, company, gpa } = req.query;

    let filtered = internships;

    if (major) {
        filtered = filtered.filter(internship => internship.major.toLowerCase() === (major as string).toLowerCase());
    }

    if (company) {
        filtered = filtered.filter(internship => internship.company.toLowerCase() === (company as string).toLowerCase());
    }

    if (gpa) {
        filtered = filtered.filter(internship => internship.gpa === Number(gpa));
    }

    res.json(filtered);
});

export default router;