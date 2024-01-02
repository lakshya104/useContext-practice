"use client"

import React, { Dispatch, createContext, useContext, useReducer } from "react";

interface TasksProviderProps {
  children: React.ReactNode;
}

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface Action {
  type: "added" | "changed" | "deleted";
  id?: number;
  text?: string;
  task?: Task;
}

const TasksContext = createContext<Task[] | null>(null);

const TasksDispatchContext = createContext<Dispatch<Action> | null>(null);

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}



export function useTasks(): Task[] {
  const tasks = useContext(TasksContext);
  if (tasks === null) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return tasks;
}

export function useTasksDispatch(): Dispatch<Action> {
  const dispatch = useContext(TasksDispatchContext);
  if (dispatch === null) {
    throw new Error("useTasksDispatch must be used within a TasksProvider");
  }
  return dispatch;
}

function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id!,
          text: action.text!,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task!.id) {
          return action.task!;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks: Task[] = [
  { id: 0, text: "Philosopher Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
