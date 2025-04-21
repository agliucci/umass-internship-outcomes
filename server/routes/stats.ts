import express from "express";
import { internships, Internship } from "../models/internship";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const allInternships = await prisma.internship.findMany();
    const totalCount = allInternships.length;
    const totalPay = allInternships.reduce((acc: number, e: { pay: number; }) => acc + e.pay, 0);
    const avgPay = totalCount > 0 ? totalPay / totalCount : 0;

    res.json({ count: totalCount,
            averagePay: avgPay
    });
})




export default router;