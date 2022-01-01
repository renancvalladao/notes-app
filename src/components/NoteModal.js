import { useState, forwardRef } from "react"
import './NoteModal.css'

const NoteModal = forwardRef((props, ref) => {

    const [edit, setEdit] = useState(false)

    return (
        <div className='modal-background'>
            <div ref={ref} className='note-modal'>
                {edit ?
                    <textarea className='note-input-modal' autoFocus>
                        This is a note
                        This is a note
                    </textarea>
                    :
                    <div className='note-text-modal' onClick={() => setEdit(true)}>
                        This is a note
                        This is a note
                    </div>
                }
            </div>
        </div>
    )
})

export default NoteModal
