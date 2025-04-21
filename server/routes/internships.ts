import express from "express";
import { internships, Internship } from "../models/internship";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//add to db
router.post('/', async (req: express.Request, res: express.Response) => {
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

  await prisma.internship.create({
    data: { company, position, pay, major, gpa, experience }
  });
  res.status(201).json({ message: "Internship submitted!" });
});

//retrieve from db
router.get('/', async (req, res) => {
  const { major, company, gpa } = req.query;
  let filters: any = {};



  if (major) filters.major = { equals: major as string, mode: 'insensitive'};
  if (company) filters.company = { equals: company as string, mode: 'insensitive'};
  if (gpa) filters.gpa = Number(gpa);

  const results = await prisma.internship.findMany({
    where: filters
  });

  res.json(results);
});

export default router;
