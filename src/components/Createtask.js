import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import TaskContext from '../Context/TaskContext';

function Createtask() {

  const Context = useContext(TaskContext);
  const { addTask, handleFilter } = Context;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    team: '',
    assignee: '',
    priority: 'P0',// Default priority
    status: 'pending'
  });
  const [error, setError] = useState('');

  const handleClose = () => {
    setShow(false);
    // Reset form data and error message when modal is closed
    setFormData({
      title: '',
      description: '',
      team: '',
      assignee: '',
      priority: 'P0', // Reset priority to default
      status: 'pending'
    });
    setError('');
  }

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log({name,value});
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSave = () => {
    // Check if any field is empty
    const isEmpty = Object.values(formData).some(value => value === '');
    if (isEmpty) {
      // console.log(isEmpty,formData)

      setError('All fields are required.');
    } else {

      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (0-indexed)
      const day = String(date.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      const uniqueId = Date.now().toString();
      const updatedFormData = {
        ...formData,
        id: uniqueId,
        date:formattedDate
      };

      setFormData(updatedFormData);
      // console.log(updatedFormData);
      addTask(updatedFormData);
      // After successful save, close the modal
      handleClose();
    }
  }

  // for filter 

  const [filterCriteria, setFilterCriteria] = useState({ priority: '', assignee: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // console.log({name,value});
    setFilterCriteria(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleClickFilter = () => {
    handleFilter(filterCriteria);
  }

  return (
    <div className='createtask'>
      <div className='single-createtask'>
        <div className='filter'>
          <h5>Filter By:</h5>
          <InputGroup className="mb-5">
            {/* <InputGroup.Text id="basic-addon1">Title</InputGroup.Text> */}
            <Form.Control
              required
              aria-label="assignee"
              aria-describedby="basic-addon1"
              placeholder='Assignee'
              name='assignee'
              value={filterCriteria.assignee}
              onChange={handleFilterChange}
            />
          </InputGroup>
          <InputGroup className="mb-5">
            {/* <InputGroup.Text>Priority</InputGroup.Te */}
            <Form.Select
              required
              aria-label="priority"
              name="priority"
              value={filterCriteria.priority}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </Form.Select>
          </InputGroup>
          <InputGroup className="mb-5">
            {/* <InputGroup.Text id="basic-addon1">Date</InputGroup.Text> */}
            <Form.Control
              type='date'
              required
              aria-label="date"
              aria-describedby="basic-addon1"
              placeholder='Date'
              name='date'
              value={filterCriteria.date}
              onChange={handleFilterChange}
            />
          </InputGroup>
          <Button className='Gobtn' onClick={handleClickFilter}>Go</Button>
        </div>
        <Button className='createtaskButton' variant="primary" onClick={handleShow}>
          Add New Task
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Create a Task</Modal.Title>
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
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Team</InputGroup.Text>
              <Form.Control
                aria-label="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Assignee</InputGroup.Text>
              <Form.Control
                required
                aria-label="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
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
          </Modal.Body>
          <Modal.Footer>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Createtask;
