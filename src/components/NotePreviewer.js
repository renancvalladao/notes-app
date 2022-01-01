import './NotePreviewer.css'

const NotePreviewer = ({ onClick, note }) => {

    return (
        <div className='note-previewer' onClick={onClick}>
            <div className='note-previewer-text'>
                {note.data}
            </div>
        </div>
    )
}

export default NotePreviewer
