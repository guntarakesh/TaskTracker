import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import TaskContext from '../Context/TaskContext';

function Edittask(props) {
  // console.log(task);
  const task = props.task;
  const Context = useContext(TaskContext);
  const { editTask} = Context;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    team: task.team,
    assignee: task.assignee,
    priority: task.priority,// Default priority
    status: task.status,
    id: task.id
  });

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSave = () => {
    // console.log(formData)
    editTask(formData);
    // After successful save, close the modal
    handleClose();
  }

  const handleReset = () => {
    setFormData(task);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
              <Form.Control
                required
                aria-label="title"
                aria-describedby="basic-addon1"
                name='title'
                value={formData.title}
                disabled
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="description"
                name="description"
                value={formData.description}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Team</InputGroup.Text>
              <Form.Control
                aria-label="team"
                name="team"
                value={formData.team}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Assignee</InputGroup.Text>
              <Form.Control
                required
                aria-label="assignee"
                name="assignee"
                value={formData.assignee}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Priority</InputGroup.Text>
              <Form.Select
                required
                aria-label="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="P1">P0</option>
                <option value="P2">P1</option>
                <option value="P3">P2</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Status</InputGroup.Text>
              <Form.Select
                required
                aria-label="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">pending</option>
                <option value="on progress">on progress</option>
                <option value="completed">completed</option>
                <option value="deployed">deployed</option>
                <option value="deprecated">deprecated</option>
              </Form.Select>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Edittask;
