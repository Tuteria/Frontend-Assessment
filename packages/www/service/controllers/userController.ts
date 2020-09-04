import { authHelper } from '../utils';
import { noteService, userService } from '../db';

async function createUser(req, res) {
  const { username, email, password } = req.body
  try {
    const userById = await userService.findByUsername(username);
    if (userById) {
      return res.status(409).json({
        status: 'error',
        error: 'Username already taken',
      });
    }
    const userByEmail = await userService.findByEmail(email);
    if (userByEmail) {
      return res.status(409).json({
        status: 'error',
        error: 'Email already registered',
      });
    }
    const hashedPassword = await authHelper.generateHash(password);
    const createdUser = await userService.createUser({
      username,
      email,
      is_admin: false,
      password: hashedPassword
    })
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'User successfully created',
        email: createdUser.email,
        username: createdUser.username,
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      'error': 'Something went wrong'
    })
  }
}

async function getNotes(req, res) {
  const { username } = req.query;
  try {
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(409).json({
        status: 'error',
        error: 'User does not exit'
      })
    }
    const notes = await noteService.getNotesByUserId(user.id)
    return res.status(200).json({
      status: 'success',
      data: notes
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      data: 'Something went wrong'
    })
  }
}

async function getOneNote(req, res) {
  const { username, noteId } = req.query;
  try {
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(409).json({
        status: 'error',
        error: 'User does not exit'
      })
    }
    const note = await noteService.findById(Number(noteId));
    if (!note) {
      return res.status(409).json({
        status: 'error',
        error: 'Note does not exit'
      })
    }
    if (note.user_id === user.id) {
      return res.status(200).json({
        status: 'success',
        data: note
      })
    } else {
      return res.status(400).json({
        status: 'error',
        error: 'User does not have the requested note'
      })
    }
    
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Something went wrong'
    })
  }
}

async function updateOneNote(req, res) {
  const { username, noteId } = req.query;
  const { title, description } = req.body;
  try {
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(409).json({
        status: 'error',
        error: 'User does not exit'
      })
    }
    const note = await noteService.findById(Number(noteId));
    if (!note) {
      return res.status(409).json({
        status: 'error',
        error: 'Note does not exit'
      })
    }
    if (note.user_id === user.id) {
      const updatedNote = await noteService.updateNote(Number(note.id), {description, title});
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Note successfully updated',
          ...updatedNote
        }
      })
    } else {
      return res.status(400).json({
        status: 'error',
        error: 'User does not have the requested note'
      })
    }
    
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Something went wrong'
    })
  }
}

async function deleteOneNote(req, res) {
  const { username, noteId } = req.query;
  try {
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(409).json({
        status: 'error',
        error: 'User does not exit'
      })
    }
    const note = await noteService.findById(Number(noteId));
    if (!note) {
      return res.status(409).json({
        status: 'error',
        error: 'Note does not exit'
      })
    }
    if (note.user_id === user.id) {
      const deletedNote = await noteService.deleteOne(Number(note.id));
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Note successfully deleted',
          ...deletedNote
        }
      })
    } else {
      return res.status(400).json({
        status: 'error',
        error: 'User does not have the requested note'
      })
    }
    
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      data: 'Something went wrong'
    })
  }
}

async function createNote(req, res) {
  const { username } = req.query;
  const { title, description } = req.body;
  try {
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(409).json({
        status: 'error',
        error: 'User does not exit'
      })
    }
    const createdNote = await noteService.createUserNote(user.id, {description, title,});
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Note successfully updated',
        ...createdNote
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Something went wrong'
    })
  }
}

export { createUser, createNote, getNotes, getOneNote, updateOneNote, deleteOneNote };
