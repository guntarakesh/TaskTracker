import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Edittask from './Edittask';
import DeleteTask from './DeleteTask';
import TaskContext from '../Context/TaskContext'

function ShowStatusTasks(props) {

    const colors = {
        'pending': 'grey',
        'on progress': 'rgb(218, 218, 56)',
        'copleted': 'green',
        'deployed': 'indigo',
        'deprecated': 'coral'
    }

    const Context = useContext(TaskContext);
    const { tasks, filterTasks } = Context;
    const status = props.status;
    return (
        <div>

            <div className='cards'>
                <Button style={{ borderRadius: '0px', backgroundColor: colors[status] }}>{status}</Button>
                {
                    tasks.map(task => {

                        return task.status === status && filterTasks(task) && <Card className='card' key={task.id} style={{}}>
                            <Card.Body>
                                <Card.Title className='title'> <p>{task.title}</p> <p style={{ backgroundColor: 'blue', color: 'white', padding: '5px' }}>   {task.priority} </p> </Card.Title>
                                <hr></hr>
                                <Card.Text>
                                    {task.description}
                                </Card.Text>
                                <Card.Text className='assignee'>
                                    <div>
                                        @{task.assignee}
                                    </div>
                                    <div> <DropdownButton title="&#x22EE;">
                                        <Dropdown.Item ><Edittask task={task} />  </Dropdown.Item>

                                        {status !== 'completed' && <Dropdown.Item > <DeleteTask title={task.title} id={task.id} /> </Dropdown.Item>}
                                    </DropdownButton></div>

                                </Card.Text>
                                <Card.Text className='status'>
                                    <Button variant='primary'>   {task.status} </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    })
                }
            </div>
        </div>
    )
}

export default ShowStatusTasks