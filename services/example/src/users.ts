import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import authenticate from './middlewares/auth';
import validate from './middlewares/validate';
import helper from './helper/hash';
import jwt from 'jsonwebtoken';

const router = Router();
const key = process.env.SECRET_KEY || 'this∂®ƒ†®coulud%3be%-real man';


router.post("/create", authenticate.isAdmin, validate.createUser, async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, password, email } = req.body;
	const role = req.body.role? req.body.role : 'user';
	const hassPassword = helper(password);

	try {
      const result = await prisma.users.create({
        data: { username, password: hassPassword, email, role },
			});
			delete result.password

			return res.status(201).json({message: 'User created succesfully', data: result});

	} catch(e) {
		return res.status(500).json({
			error: 'An error occured, pls try again later.',
		});
	}
});


router.get("/:username/notes", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username } = req.params;

	try{
		const result: any = await prisma.users.findOne({
			where: { username: username },
		});

		if (result) {
			delete result.password

			const userNotes = await prisma.notes.findMany({
				where: { user: username },
			});
			result['notes'] = userNotes;

			return res.status(200).json({data: result});

		} else {
			return res.status(404).json({message: 'Use not found'});

		}

	} catch(e) {
		return res.status(500).json({
			error: 'An error occured, pls try again later.'
		});
	}
});



router.post("/auth", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, password, email } = req.body;

	try{

		let foundUser = await prisma.users.findOne({ where: { email: email } });

		if (foundUser){
			const hassPassword = helper(password);
			if (hassPassword == foundUser.password){
				delete foundUser.password

				const token = jwt.sign({foundUser}, key,{
					expiresIn: '7d'
				})

				return res.status(200).json({message: 'Login succesful', token });
			} else {
				return res.status(400).json({error: 'Invalid login credentials.'});
			}
			
		} else {
			return res.status(400).json({error: 'Invalid login credentials.'});
		}
	
	} catch(e) {
		return res.status(500).json({
			error: 'An error occured, pls try again later.',
			e
		});
	}
});


export default router;
