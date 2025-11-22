import React from 'react'

function CreateNote({saveText, saveNotes, Title, titleChange, inputText}) {
  return (
    <div className='note'>
      <input type='text' placeholder='Title' onChange={titleChange} value={Title}></input> <br></br>
      <textarea cols="50" rows="20" placeholder="Type Notes Here" onChange={saveText} value={inputText}>

      </textarea>
      <div>
        <button className='save_note' onClick={saveNotes}>SAVE NOTE</button>
      </div>
      <br></br>
    </div>
  )
}

export default CreateNote
