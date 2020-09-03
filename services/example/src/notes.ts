import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title, author } = req.body;
	console.log("Reaching the notes creat route")
	try {
		const result = await prisma.notes.create({
			data: {
				description,
				title,
				...(author && { author: author }),
			},
		});
		// const foundPost = await prisma.notes.findMany();
		res.status(200).json(result);
	} catch (err) {
		console.log("something went wrong",err)
		return res.status(401).json({
			error: err.message || "Something went wrong",
		});
	}
});

router.get("/", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	try{
		const notes = await prisma.notes.findMany({
			where: { author: null },
		});
		return res.status(200).json(notes);
	}catch(err){
		return res.status(200).json({
			message:err.message || "Something went wrong"
		})
	}
});
router.put("/:noteId", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const noteId = Number(req.params.noteId);
	const { title, description } = req.body;
	let foundNotes = await prisma.notes.findOne({ where: { id: noteId } });
	try {
		if (foundNotes) {
			const updatedNote = await prisma.notes.update({
				where: { id: noteId },
				data: {
					title: title ? title : foundNotes.title,
					description: description ? description : foundNotes.description,
					...(foundNotes.author && {author: foundNotes.author }),
				},
			});
			res.status(200).json(updatedNote);
		}else{
			res.status(400).json({
				message:"Note not found"
			})
		}
	} catch (err) {
		console.log(err)
		return res.status(401).json({
			error: err.message || "Something went wrong",
		});
	}
});
router.delete("/:noteId", async (req, res) => {
	const noteId = Number(req.params.noteId);
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const deletedNote = await prisma.notes.delete({
			where: { id: Number(noteId) }
		})
		return res.status(200).json({
			message:`successfully deleted ${deletedNote.title}`,
			data:deletedNote
		})
		}catch(err){
			return res.status(400).json({
				message:err.message || "Unable to delete note"
			})
		}
});

export default router;
