import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createAttendance = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { userId } = req.params;

    const userValidate = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!userValidate) {
        return res.status(400).json({ message: "Esse usuario nao existe no sistema" })
    }


    const attendance = await prisma.attendance.create({
        data: {
            name,
            User: {
                connect: {
                    id: userId
                }
            }
        }
    })

    return res.json(attendance)
}

export const getAllAttendance = async (req: Request, res: Response) => {

    const attendances = await prisma.attendance.findMany({
        select: {
            id: true,
            name: true,
            User:{
                select:{
                    name: true,
                }
            }
        }
    }
    )

    return res.json(attendances)
}