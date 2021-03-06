import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteModal from './components/NoteModal'
import NotePreviewer from './components/NotePreviewer'
import './App.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [notes, setNotes] = useState([])
  const [modalIndex, setModalIndex] = useState(null)
  const [stickButton, setStickButton] = useState(false)

  const ref = useRef()

  const addNewNote = () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    let day = date.getDate() + 1
    day = day < 10 ? `0${day}` : day
    let hours = date.getHours()
    hours = hours < 10 ? `0${hours}` : hours
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? `0${minutes}` : minutes
    let seconds = date.getSeconds()
    seconds = seconds < 10 ? `0${seconds}` : seconds
    const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    const newNote = { createdAt, data: '' }
    setNotes(prevState => [newNote, ...prevState])
    setModalIndex(0)
  }

  useEffect(() => {
    const scrollListener = () => {
      console.log(window.scrollY)
      if (window.scrollY > 190) {
        setStickButton(true)
      } else {
        setStickButton(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  useEffect(() => {
    let notes = localStorage.getItem('notes')
    if (notes) {
      notes = JSON.parse(notes)
      setNotes(notes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
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
  }, [ref])

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
      {stickButton &&
        <div className="new-note-fixed">
          <button onClick={addNewNote}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>}
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
