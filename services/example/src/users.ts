import { PrismaClient } from "@prisma/client";
import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
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

interface IDecoded {
	admin:boolean
}

const jwtSecret = process.env.jwtSecret || "noibsoabiibadilboibvsofnapsndfansdiin"

const verifyAdmin = (req:Request,res:Response,next:NextFunction) => {
	try{
		if(req.headers.authorization){
			const token = req.headers.authorization.split(" ")[1]
			jwt.verify(token,jwtSecret,function(err,decoded){
				if(err){
					return res.status(400).json({
						message:err.message || "Unauthorized"
					})
				}
					if((decoded as unknown as IDecoded).admin){
							return next();
					}else{
							return res.status(400).json({
								message:"err authorized"
							})
					}
			})
		}
	}catch(e){
			return next({
					status:401,
					message:"You are not allowed to perform this actions"
			})
	}
}
router.get("/",verifyAdmin,async (req,res) => {
	const prisma : PrismaClient = req.app.locals.prisma;
	try{
		const allUser = await prisma.users.findMany()
		const newArr = []
		for(let i = 0;i < allUser.length; i++){
			const foundNote = await prisma.notes.findMany({where:{author:allUser[i].username}})
			newArr.push({...allUser[i],notes:foundNote})
		}
		res.status(200).json(newArr)
	}catch(err){
		return res.status(401).json({
			message:err.message || "Something went wrong"
		})
	}
})

router.post("/login",async (req,res) => {
	const prisma : PrismaClient = req.app.locals.prisma;
	const {email,password} = req.body;
	try{
		const foundUser = await prisma.users.findOne({
			where:{email:email}
		})
		if(foundUser && foundUser.password.toLowerCase() == password.toLowerCase()){
			const token = jwt.sign({admin:foundUser.admin},jwtSecret,{
				expiresIn:60*60
			})
			return res.status(200).json({
				message:"Login Successful",
				token,
				user:{
					email:foundUser.email,
					username:foundUser.username,
					admin:foundUser.admin
				}
			})
		}else{
			return res.status(400).json({
				message:"Unable to Login"
			})
		}
	}catch(err){
		res.status(400).json({
			message:"Something went wrong"
		})
	}
})

router.put("/:username/admin",verifyAdmin,async (req,res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const username = req.params.username
	let foundUser = await prisma.users.findOne({ where: { username:username } });
	try {
		if (foundUser) {
			const updatedUser = await prisma.users.update({
				where: { id:foundUser.id },
				data: {
					about:foundUser.about,
					email:foundUser.email,
					username:foundUser.username,
					password:foundUser.password,
					admin:!foundUser.admin
				}
			});
			res.status(200).json({
				message:updatedUser.admin ? "New Admin Successful" : `${foundUser.username} admin Successful deactivation`
			});
		}else{
			res.status(400).json({
				message:"Note not found"
			})
		}
	} catch (err) {
		return res.status(401).json({
			message: err.message || "Something went wrong",
		});
	}
})

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, email, password, about,admin } = req.body;
	try {
		const newUser = await prisma.users.create({
			data: { username, email, password, about,admin }
		});
		res.status(200).json(newUser);
	} catch (err) {
		return res.status(401).json({
			error: err.message || "Something Went Wrong",
		});
	}
});

router.get("/:username/notes", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username } = req.params;
	try {
		const foundNotes = await prisma.notes.findMany({
			where: { author:username },
		});
		res.status(200).json(foundNotes);
	} catch (err) {
		res.status(400).json({
			error: err.message || "Something Went Wrong",
		});
	}
});

export default router;
