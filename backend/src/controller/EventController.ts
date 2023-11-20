import { Request } from "express";
import { prisma } from "../database/prisma";

export const createEvent = async (req: Request, res: Response) => {
    const { title } = req.body;

    const event = await prisma.event.create({
        data: { 
            title
        },
    });

    return res.json(event);
} 

export const getallEventes = async (req: Request, res: Response) => {

    const events = await prisma.event.findMany()

    return res.json(events);
} 