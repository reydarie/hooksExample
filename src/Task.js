import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";

const TASK_STORAGE_KEY = "TASK_STORAGE_KEY";

const storeTasks = (taskMap) => {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(taskMap));
};

const restoredTasks = () => {
  const taskMap = JSON.parse(localStorage.getItem(TASK_STORAGE_KEY));
  
  return taskMap ? taskMap : { tasks: [], completedTasks: [] };
};

function Task() {
  const [taskText, setTaskText] = useState("");
  const storedTasks = restoredTasks();
  const [tasks, setTasks] = useState(storedTasks.tasks);
  const [completedTasks, setCompletedTasks] = useState(
    storedTasks.completedTasks
  );

  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  });

  const updateTextTask = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = () => {
    setTasks([...tasks, { taskText, id: uuid() }]);
  };

  const completeTask = (task) => () => {
    setCompletedTasks([...completedTasks, task]);
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const deleteTask = (task) => () => {
    setCompletedTasks(completedTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={taskText} onChange={updateTextTask} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => {
          const { id, taskText } = task;

          return (
            <div key={id} onClick={completeTask(task)}>
              {taskText}
            </div>
          );
        })}
      </div>
      <div className="completed-list">
        {completedTasks.map((task) => {
          const { id, taskText } = task;

          return (
            <div key={id}>
              {taskText + "   "}
              <span className="delete-task" onClick={deleteTask(task)}>
                x
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Task;
