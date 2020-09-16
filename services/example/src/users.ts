import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import { hash, compare } from 'bcryptjs'
import {generateToken} from "./authentication";


const prisma = new PrismaClient()


/**
 * Creates a new User
 * @method createUser
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object

 */
async function createUser(req: any, res: any) {
	try {
		const { email, username, password } = req.body;
		const foundUser = await prisma.users.findOne({
			where:{email: email}
		})
		if (foundUser) {
			return res.status(409)
				.json({
					success: false,
					message: `${username} already exists`,
				});
		}

		const hashPassword = await hash(password, 10);

		const createdUser = await prisma.users.create({
			data: {email, username, password: hashPassword, is_admin: false},
		});

		const payload = {
			id: createdUser.id,
			is_admin: createdUser.is_admin,
		};

		const token = generateToken(payload);
		res.status(201).json({
			status: 'success',
			message: 'User Created',
			createdUser,
			token
		});
	} catch (error) {
		return res.status(400).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
}

/**
 * Logs in a user
 * @method loginUser
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object

 */
async function loginUser(req: any, res: any) {
	try {
		const {username, password} = req.body;

		const foundUser = await prisma.users.findOne({
			where:{username: username}
		})

		if (!foundUser) console.log("hhhhh")

		let match= false;
		if (foundUser) match = await compare(password, foundUser.password);

		if (!foundUser || !match) {
			return res.status(401).json({
				success: false,
				message: 'Invalid username or password',
			});
		}


		const payload = {
			id: foundUser.id,
			username: foundUser.username,
			is_admin: foundUser.is_admin,
		};
		const token = generateToken(payload);
		return res.status(200).json({
			success: true,
			message: `Welcome, ${username}`,
			token,
			// user: payload
		});
	} catch(error){
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
}

/**
 * Retrieves all Notes
 * @memberof NoteController
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object
 */
async function retrieveAllUsers(req: any, res: any) {
	try {
		const users = await prisma.users.findMany({
			include: {
				notes: true,
			},
		});
		return res.status(200).json({
			success: true,
			message: 'Users retrieved',
			users
		});
	} catch (error) {
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
};

async function retrieveUserNotes(req: any, res: any) {
	try {
		const { username } = req.query;
		const notesByUser = await prisma.notes.findMany({
			where: { users: {username: username} }
		})

		res.status(200).json({
			success: true,
			message: `${username} notes retrieved`,
			notes: notesByUser
		});
	} catch (error) {
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
}


export {createUser, loginUser, retrieveAllUsers, retrieveUserNotes};
