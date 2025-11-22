import React, {useCallback, useState} from 'react'
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { axios } from "axios"
import "../Css/Note.css";


const StoredNote = (title,text) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [values,setValues] = useState([]);
  const getValues = useCallback(async () => {
    const values = await axios.get('/api/values/all');
    setValues(values);
  });

  return (
    <div><Button variant="primary" onClick={handleShow}>
      {title}
    </Button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{values.title}</Modal.Title><br></br>
        </Modal.Header>
        <Modal.Body>{values.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br></br>
      </div>
      
    
  );
}

export default StoredNote
