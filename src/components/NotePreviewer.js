import './NotePreviewer.css'

const NotePreviewer = ({ onClick, note }) => {

    return (
        <div className='note-previewer' onClick={onClick}>
            <div className='note-previewer-text'>
                <p className='note-previewer-date'>Created at {note.createdAt}</p>
                {note.data}
            </div>
        </div>
    )
}

export default NotePreviewer
