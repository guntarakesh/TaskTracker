import './App.css';
import TaskMethods from './Context/TaskMethods';
import Createtask from './components/Createtask';
import Showtasks from './components/Showtasks';

function App() {
  return (
    <>
      <TaskMethods>
        <h1 style={{ margin: '20px' }}>Task Board</h1>
        <div className="App">
          <Createtask />
          <Showtasks />
        </div>
      </TaskMethods>
    </>
  );
}

export default App;
