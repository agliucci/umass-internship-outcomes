import express from "express";
import { internships, Internship } from "../models/internship";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const allInternships = await prisma.internship.findMany();

    //average pay
    const totalCount = allInternships.length;
    const totalPay = allInternships.reduce((acc: number, e: { pay: number; }) => acc + e.pay, 0);
    const avgPay = totalCount > 0 ? totalPay / totalCount : 0;

    //average pay per major
    let map = new Map<string, { totalPay: number; count: number}>();
    allInternships.forEach((e: { major: any; pay: number; }) => {
        const major = e.major;

        if (map.has(major)) {
            const current = map.get(major)!;
            current.totalPay += e.pay;
            current.count += 1;
            map.set(major, current);
        } else {
            map.set(major, {
                totalPay: e.pay,
                count: 1
            });
        }
    });

    const avgPayPerMajor: Record<string, number> = {};
    map.forEach((entry, major) => avgPayPerMajor[major] = entry.totalPay / entry.count);

    res.json({ count: totalCount,
            averagePay: avgPay,
            avgPayPerMajor
    });
})


export default router;