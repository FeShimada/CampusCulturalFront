import { Request } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, accessName } = req.body;

    const emailNotUniqueValidate = await prisma.user.findUnique({
        where: {
            email
        }
    })

    const isAccessName = await prisma.access.findUnique({
        where: {
            name: accessName
        }
    })

    if(!isAccessName){
        return res.status(400).json({message: "Esse nivel acesso nao existe no sistema"})
    }

    if(emailNotUniqueValidate){
        return res.status(400).json({message: "Esse email ja esta sendo usado no sistema"})
    }

    const hashPassword = await hash(password, 8);

    const user = await prisma.user.create({
        data: { name, email, password: hashPassword, Access:{
            connect:{
                name: accessName
            }
        } },
    });

    return res.status(200).json(user);
} 