import React, { useState, useEffect, useReducer } from "react";
import uuid from "uuid/v4";

const initialTasksState = {
  tasks: [],
  completedTasks: [],
};

const tasksReducer = (state, action) => {
  console.log("state", state, "action", action);

  switch (action.type) {
    case TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case TYPES.COMPLETE_TASK:
      const { completedTask } = action;

      return {
        ...state,
        completedTasks: [...state.completedTasks, completedTask],
        tasks: state.tasks.filter((t) => t.id !== completedTask.id),
      };
    case TYPES.DELETE_TASK:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(
          (t) => t.id !== action.task.id
        ),
      };
    default:
      return state;
  }
};

const TYPES = {
  ADD_TASK: "ADD_TASK",
  COMPLETE_TASK: "COMPLETE_TASK",
  DELETE_TASK: "DELETE_TASK",
};

const TASK_STORAGE_KEY = "TASK_STORAGE_KEY";

const storeTasks = (taskMap) => {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(taskMap));
};

const restoredTasks = () => {
  const taskMap = JSON.parse(localStorage.getItem(TASK_STORAGE_KEY));

  return taskMap ? taskMap : initialTasksState;
};

function Task() {
  const [taskText, setTaskText] = useState("");
  const storedTasks = restoredTasks();

  const [state, dispatch] = useReducer(tasksReducer, storedTasks);
  const { tasks, completedTasks } = state;

  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  });

  const updateTextTask = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = () => {
    dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuid() } });
  };

  const completeTask = (task) => () => {
    dispatch({ type: TYPES.COMPLETE_TASK, completedTask: task });
  };

  const deleteTask = (task) => () => {
    dispatch({ type: TYPES.DELETE_TASK, task });
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
