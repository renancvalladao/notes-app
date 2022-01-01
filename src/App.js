import { useState, useRef, useEffect } from 'react'
import NotePreviewer from './components/NotePreviewer'
import './App.css'
import NoteModal from './components/NoteModal'
// trocar o "+" pelo icone do font awesome
function App() {

  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)

  const ref = useRef()

  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        setShowModal(false)
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
          <button>+</button>
          <span>New Note</span>
        </div>
        <div className="notes-container">
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
          <NotePreviewer onClick={() => setShowModal(true)} />
        </div>
      </div>
      {showModal && <NoteModal ref={ref} />}
    </>
  )
}

export default App
