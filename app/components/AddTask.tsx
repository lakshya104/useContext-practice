"use client";

import { useState } from "react";
import { useTasksDispatch } from "./TaskContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();
  return (
    <div className="flex p-2 m-2">
      <input
        className="p-2 rounded-xl m-2 text-black outline-none"
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="p-2 px-4 rounded-xl bg-white text-black m-2"
        onClick={() => {
          setText("");
          dispatch({
            type: "added",
            id: nextId++,
            text: text,
          });
        }}
      >
        Add
      </button>
    </div>
  );
}

let nextId = 3;
