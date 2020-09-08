import * as assert from "uvu/assert";
import "hard-rejection/register";
import { suite } from "uvu";
import nextRequest from '../../utils/nextRequest';
import notes from '../../pages/api/notes/index';
import notes_create from '../../pages/api/notes/create';
import notes_noteId from '../../pages/api/notes/[noteId]';
import { clearNotes, loadNotes }from '../../utils/seedDB';

const Notes = suite("/notes endpoints");

Notes.before(async () => {
  const count = await clearNotes()
  assert.is(count, 0);
})

Notes.after(async () => {
  const count = await clearNotes()
  assert.is(count, 0);
})

Notes("GET /notes should fetch all anonymous notes",
  async () => {
    const loadedNotes = await loadNotes(5);
    const req = await nextRequest(notes, {noteId: '453'});
    await req.get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.status, 'success');
        assert.is(res.body.data.length, loadedNotes.length)
      });
  }
);

Notes("POST /notes/create should add a new note",
  async () => {
    const note = {
      title: "Sample title",
      description: 'Sample description'
    }
    const req = await nextRequest(notes_create);
    await req.post('/')
      .send(note)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        assert.is(res.body.data.title, note.title);
      });
  }
);

Notes("GET /notes/:noteId should fetch a note",
  async () => {
    const loadedNotes = await loadNotes();
    const noteId = loadedNotes[0].id;
    const req = await nextRequest(notes_noteId, {
      noteId : String(noteId)
    });
    await req.get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.id, noteId);
      });
  }
);

Notes("PUT /notes/:noteId should update a note",
  async () => {
    const loadedNotes = await loadNotes(2);
    const noteId = loadedNotes[0].id
    const req = await nextRequest(notes_noteId, {
      noteId: String(noteId)
    })
    await req.put(`/`)
      .send({ 
        title: loadedNotes[1].title,
        description: loadedNotes[1].description
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.id, noteId);
        assert.is(res.body.data.title, loadedNotes[1].title);
      });
  }
);

Notes("DELETE /notes/:noteId should delete a note",
  async () => {
    const loadedNotes = await loadNotes(3);
    const noteId = loadedNotes[0].id
    const req = await nextRequest(notes_noteId, {
      noteId: String(noteId)
    })
    await req.delete(`/`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.id, noteId);
      });
  }
);

Notes.run();
