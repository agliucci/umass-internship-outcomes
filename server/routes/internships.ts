import express from "express";
import { internships, Internship } from "../models/internship";

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response) => {
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
    return;
  }

  internships.push(newInternship);
  res.status(201).json({ message: "Internship submitted!" });
});

router.get('/', (req, res) => {
  const { major, company, gpa } = req.query;
  let filtered = internships;

  if (major) {
    filtered = filtered.filter(i => i.major.toLowerCase() === (major as string).toLowerCase());
  }

  if (company) {
    filtered = filtered.filter(i => i.company.toLowerCase() === (company as string).toLowerCase());
  }

  if (gpa) {
    filtered = filtered.filter(i => i.gpa === Number(gpa));
  }

  res.json(filtered);
});

export default router;
