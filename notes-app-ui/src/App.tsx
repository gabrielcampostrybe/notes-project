import { useState } from "react"
import "./App.css"

type Note = {
  id: number
  title: string
  content: string
}

const App = () => {
  const [notes, setNotes] = useState<
    Note[]
  >([
    {
      id: 1,
      title: "Note Title 1",
      content: "Note Content 1"
    },
    {
      id: 2,
      title: "Note Title 2",
      content: "Note Content 2"
    },
    {
      id: 3,
      title: "Note Title 3",
      content: "Note Content 3"
    },
    {
      id: 4,
      title: "Note Title 4",
      content: "Note Content 4"
    },
  ])

  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()

    const newNote: Note = {
      id: notes.length + 1,
      title,
      content
    }

    setNotes([newNote, ...notes])
    setTitle("")
    setContent("")
  }

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedNote) return

    const updatedNote: Note = {
      id: selectedNote.id,
      title,
      content
    }

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id
        ? updatedNote
        : note
    )

    setNotes(updatedNotesList)
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  const deleteNote = (
    e: React.MouseEvent,
    noteId: number
  ) => {
    e.stopPropagation()

    const updatedNotes = notes.filter(
      (note) => note.id !== noteId
    )

    setNotes(updatedNotes)
  }


  return (
    <div className="app-container">
      <form
        onSubmit={(e) =>
          selectedNote
            ? handleUpdateNote(e)
            : handleAddNote(e)
        }
        className="note-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        >
        </input>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={10}
          required
        >
        </textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (<button type="submit">Add Note</button>)}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <button
              onClick={(e) => deleteNote(e, note.id)}
              >x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App