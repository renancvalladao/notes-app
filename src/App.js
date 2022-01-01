import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteModal from './components/NoteModal'
import NotePreviewer from './components/NotePreviewer'
import './App.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [notes, setNotes] = useState([])
  const [modalIndex, setModalIndex] = useState(null)

  const ref = useRef()

  const addNewNote = () => {
    const createdAt = new Date()
    const newNote = { createdAt, data: '' }
    setNotes(prevState => [newNote, ...prevState])
    setModalIndex(0)
  }

  useEffect(() => {
    let notes = localStorage.getItem('notes')
    notes = JSON.parse(notes)
    setNotes(notes)
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes)) 
  }, [notes])

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
          <button onClick={addNewNote}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
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
