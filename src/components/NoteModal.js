import { useState, forwardRef, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './NoteModal.css'
import { faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const NoteModal = forwardRef(({ note, onSave, onDelete }, ref) => {

    const [input, setInput] = useState(note.data)
    const [edit, setEdit] = useState(false)
    const textAreaRef = useRef()

    const focus = () => {
        textAreaRef.current.focus()
    }

    return (
        <div className='note-modal-background'>
            <div ref={ref} className='note-modal'>
                <p className="note-modal-date">Created at {note.createdAt}</p>
                {edit ?
                    <textarea className='note-modal-input'
                        onBlur={() => focus()}
                        autoFocus value={input}
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck={false}
                        ref={textAreaRef}
                        placeholder="Write in Markdown format" />
                    :
                    <div className='note-modal-text' onClick={() => console.log('asdasd')}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.data}</ReactMarkdown>
                    </div>
                }
                <div className="note-modal-buttons">
                    {edit ?
                        <button className="save-button" onClick={() => {
                            setEdit(false)
                            onSave(input)

                        }}>
                            <FontAwesomeIcon icon={faSave} />
                        </button> :
                        <button className="edit-button" onClick={() => setEdit(true)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>}
                    <button className="delete-button" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    )
})

export default NoteModal
