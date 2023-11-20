import { Request } from "express";
import { prisma } from "../database/prisma";

export const createAccess = async (req: Request, res: Response) => {
    const { name } = req.body;

    const access = await prisma.access.create({
        data: { name },
    });

    return res.json(access);
} 

export const getallAccesses = async (req: Request, res: Response) => {

    const access = await prisma.access.findMany()

    return res.json(access);
} 