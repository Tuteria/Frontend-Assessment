import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

interface INote { 
	description:string | null;
	title:string | null;
}

interface IUser { 
	username:string;
	password:string;
	about:string;
	notes?:INote[]
}

router.get("/",async (req,res) => {
	const prisma : PrismaClient = req.app.locals.prisma;
	try{
		const allUser = await prisma.users.findMany()
		const newArr = []
		for(let i = 0;i < allUser.length; i++){
			const foundNote = await prisma.notes.findMany({where:{author:allUser[i].username}})
			newArr.push({...allUser[i],notes:foundNote})
			console.log("This is the newArr",newArr)
		}
		console.log("Finlally",newArr)

		res.status(200).json(newArr)
	}catch(err){
		return res.status(401).json({
			message:err.message || "Something went wrong"
		})
	}
})

router.post("/create", async (req, res) => {
	console.log("reaching the create route",req.body)
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, email, password, about } = req.body;
	try {
		const newUser = await prisma.users.create({
			data: { username, email, password, about }
		});
		res.status(200).json(newUser);
	} catch (err) {
		console.log("something went wrong",err)
		return res.status(401).json({
			error: err.message || "Something Went Wrong",
		});
	}
});

router.get("/:username/notes", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username } = req.params;
	console.log("reaching username routes")
	try {
		const foundNotes = await prisma.notes.findMany({
			where: { author:username },
		});
		res.status(200).json(foundNotes);
	} catch (err) {
		console.log("something went wrong",err)
		res.status(400).json({
			error: err.message || "Something Went Wrong",
		});
	}
});

export default router;
