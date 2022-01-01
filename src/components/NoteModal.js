import { useState, forwardRef } from "react"
import './NoteModal.css'

const NoteModal = forwardRef(({ note, onSave, onDelete }, ref) => {

    const [input, setInput] = useState(note.data)
    const [edit, setEdit] = useState(false)

    return (
        <div className='note-modal-background'>
            <div ref={ref} className='note-modal'>
                {edit ?
                    <textarea className='note-modal-input' autoFocus value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
                    :
                    <div className='note-modal-text'>
                        {note.data}
                    </div>
                }
                <div className="note-modal-buttons">
                    {edit ?
                        <button className="save-button" onClick={() => {
                            setEdit(false)
                            onSave(input)

                        }}>Save</button> :
                        <button className="edit-button" onClick={() => setEdit(true)}>Edit</button>}
                    <button className="delete-button" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
})

export default NoteModal
