import React, { useState } from 'react'
import TaskContext from './TaskContext'
const TaskMethods = (props) => {

  // const initial = {
  //   assignee: "rakesh", description: "klkk h raksh is the boy in the reaers ", id: "1711745567270",
  //   priority: "P0", status: "pending", team: "spitiers ", title: "task 1 "
  // };
  // const initial1 = {
  //   assignee: "rakesh", description: "klkk h raksh is the boy in the reaers ", id: "1511745567270",
  //   priority: "P0", status: "pending", team: "spitiers ", title: "task 2 "
  // };

  const [tasks, setTasks] = useState([]);
  // To Add a Task 
  const addTask = (task) => {
    //   console.log(task)
    setTasks(prev => [...prev, task]);
  }

  // to delete a Task 
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    })
    setTasks(newTasks);
  }

  // edit a task 
  const editTask = ({ id, priority, status }) => {
    let newTasks = JSON.parse(JSON.stringify(tasks));

    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element.id === id) {
        newTasks[index].status = status;
        newTasks[index].priority = priority;
        break;
      }
    }
    setTasks(newTasks);
  }


  // for filter 

  const [filterCriteria, setFilterCriteria] = useState({ priority: '', assignee: '' });
  const handleFilter = (ncriteria) => {
    setFilterCriteria({ ...filterCriteria, ...ncriteria });
  }

  const filterTasks = (task) => {
    const { priority, assignee, date } = filterCriteria;
    if(date && task.date !== date) { console.log("yes"); return false; }
    if (priority && task.priority !== priority) return false;
    if (assignee.trim() && task.assignee.trim() !== assignee.trim()) return false;
    return true;
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, handleFilter, filterTasks }} >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskMethods