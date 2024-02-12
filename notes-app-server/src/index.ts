import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/api/notes', async (req, res) => {
	const notes = await prisma.note.findMany();

	res.json(notes);
});

app.post('/api/notes', async (req, res) => {
	const { title, content } = req.body;

	if (!title || !content) {
		return res.status(400).json({ message: 'Title and content are required' });
	}
	try {
		const note = await prisma.note.create({
			data: {
				title,
				content,
			},
		});
		res.json(note);
	} catch (error) {
		res.status(500).json({ message: 'An error occurred' });
	}
});

app.put('/api/notes/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const { title, content } = req.body;

	if (!title || !content) {
		return res.status(400).json({ message: 'Title and content are required' });
	}

	if (!id || isNaN(id)) {
		return res
			.status(400)
			.json({ message: 'Invalid id, id must be a valid number' });
	}

	try {
		const updatedNote = await prisma.note.update({
			where: { id },
			data: {
				title,
				content,
			},
		});
		res.json(updatedNote);
	} catch (error) {
		res.status(500).json({ message: 'An error occurred' });
	}
});

app.delete('/api/notes/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	if (!id || isNaN(id)) {
		return res
			.status(400)
			.json({ message: 'Invalid id, id must be a valid number' });
	}

	try {
		await prisma.note.delete({
			where: { id },
		});
		res.status(204).json({ message: 'Note deleted' });
	} catch (error) {
		res.status(500).json({ message: 'An error occurred' });
	}
});

app.listen(5000, () => {
	console.log('Server has started on port 5000');
});
