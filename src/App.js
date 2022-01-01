import { useState, useRef, useEffect } from 'react'
import NotePreviewer from './components/NotePreviewer'
import './App.css'
import NoteModal from './components/NoteModal'
// trocar o "+" pelo icone do font awesome
function App() {

  const [notes, setNotes] = useState([])
  const [modalIndex, setModalIndex] = useState(null)

  const ref = useRef()

  const addNewNote = () => {
    const createdAt = new Date()
    const newNote = { createdAt, data: '' }
    setNotes(prevState => [newNote, ...prevState])
  }

  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        setModalIndex(null)
      }
      document.addEventListener("mousedown", listener)
      document.addEventListener("touchstart", listener)
      return () => {
        document.removeEventListener("mousedown", listener)
        document.removeEventListener("touchstart", listener)
      }
    },
    [ref]
  )

  return (
    <>
      <div className="app">
        <div className="new-note">
          <button onClick={addNewNote}>+</button>
          <span>New Note</span>
        </div>
        <div className="notes-container">
          {notes.map((note, index) => (
            <NotePreviewer key={index} note={note} onClick={() => setModalIndex(index)} />
          ))}
        </div>
      </div>
      {modalIndex !== null &&
        <NoteModal
          ref={ref}
          note={notes[modalIndex]}
          onSave={newData => {
            const newNote = { ...notes[modalIndex] }
            newNote.data = newData
            const newNotes = [...notes]
            newNotes[modalIndex] = newNote
            setNotes(newNotes)
          }}
          onDelete={() => {
            console.log(notes)
            const newNotes = [...notes]
            newNotes.splice(modalIndex, 1)
            console.log(newNotes)
            setNotes(newNotes)
            setModalIndex(null)
          }}
        />}
    </>
  )
}

export default App
