import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import TaskContext from '../Context/TaskContext';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function DeleteTask(props) {
  const Context = useContext(TaskContext);
  const { deleteTask } = Context;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }

  const id = props.id;
  const title = props.title;
  const handleShow = () => setShow(true);

  const handleClick = () => {
    deleteTask(id);
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleShow} variant="danger">
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to delete the <b>{title}</b> ?
          </Modal.Body>
          <Modal.Footer className='deletetasktitle'>
            <Button variant="danger" onClick={handleClose}>
              NO
            </Button>
            <Button variant="primary" onClick={handleClick}>
              YES
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default DeleteTask