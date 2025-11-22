import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { v4 as uuid } from "uuid";

const Notes = () => {
   const [notes, setNotes] = useState([]);
   const [showAddModal, setShowAddModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");
   const [selectedNote, setSelectedNote] = useState(null);
   const [time, setTime] = useState("");
  
  useEffect(() => {
    const fetchNotes = async () => {
        const response = await axios.get("/api/notes/all");
        setNotes(response.data);
    }; 
    fetchNotes();
  }, []);
  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);
  const handleEditClose = () => setShowEditModal(false);
  const handleNoteClick = async (note) => {
    const response = await axios.get(`/api/notes/${note.id}`);
    setTitle(response.data.title);
    setBody(response.data.body);
    setSelectedNote(note);
    setShowEditModal(true);
  };
    // handle add note to database
    const handleAddNote = async () => {
    // const id = uuid();
    // const currentTime = Date.now();
    // await axios.post("/api/notes", { id, title, body, modified_time: currentTime });
    // const response = await axios.get(`/api/notes/${id}`);
    // setNotes([...notes, { id, title, body, modified_time: currentTime }]);
    // setTitle("");
    // setBody("");
    // handleAddClose();
        const id = uuid();
        await axios.post("/api/notes", { id, title, body });
        setNotes([...notes, { id, title, body }]);
        setTitle("");
        setBody("");
        handleAddClose();
        window.location.reload();
    };
    //edit note to database
    const handleEditNote = async () => {
        await axios.put(`/api/notes/${selectedNote.id}`, { title, body });
        setNotes(notes.map((note) => {
        if (note.id === selectedNote.id) {
            return { ...note, title, body };
        } else {
            return note;
        }
        }));
        setTitle("");
        setBody("");
        handleEditClose();
    };


        const deleteNote = async () => {
        await axios.delete(`/api/notes/${selectedNote.id}`);
        window.location.reload();
    }


    return (
    <div>
        <h1>Notes</h1>
        <Button variant="primary" onClick={handleAddShow}>Add Note</Button>
        <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="mb-3">
                <label htmlFor="add-note-title" className="form-label">Title</label>
                <input type="text" className="form-control" id="add-note-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="add-note-body" className="form-label">Body</label>
                <textarea className="form-control" id="add-note-body" rows="3" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAddNote}>Save</Button>
        </Modal.Footer>
      </Modal>
      {selectedNote && (
        <Modal show={showEditModal} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <a>
                <span > Last Modified Time:  {time}</span>
            </a>
    
            <form>
              <div className="mb-3">
                <label htmlFor="edit-note-title" className="form-label">Title</label>
                <input type="text" className="form-control" id="edit-note-title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="edit-note-body" className="form-label">Body</label>
                <textarea className="form-control" id="edit-note-body" rows="3" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>Cancel</Button>
            <Button variant="primary" onClick={handleEditNote}>Save</Button>
            <Button variant="danger" onClick={deleteNote}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}
      <br/><br/><br/>
      <div>
        <h1 style={{textAlign: "left"}}>
            SAVED NOTES
        </h1>
      </div>
      <ul style={{ listStyleType: "disc", marginLeft: 0, paddingLeft: "1em" }}>
        {notes.map((note) => (
            <li key={note.id} onClick={() => handleNoteClick(note)} >
            <a style={{ color: "blue", textDecoration: "underline", float: "left" }}>
            {note.title}
            </a>
            </li>
        ))}
    </ul>


    </div>
  );
};
export default Notes
