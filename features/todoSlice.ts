import { createSlice, nanoid } from "@reduxjs/toolkit";

interface listType {
  id: string;
  title: string;
  active: boolean;
  date: string;
}

const initialState: any =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("tasks") || "[]")
    : [];

export const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: nanoid(),
        title: action.payload,
        active: true,
        date: new Date().toLocaleDateString("en-US"),
      };
      state?.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const filteredList = state?.filter(
        (item: any) => item.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(filteredList));
      return filteredList;
    },
    completeTask: (state, action) => {
      const completedIndex = state?.findIndex(
        (item: any) => item.id === action.payload
      );
      state[completedIndex].active = !state[completedIndex].active;
      localStorage.setItem("tasks", JSON.stringify(state));
      return state;
    },
    removeCompletedTasks: (state) => {
      const filteredList = state?.filter((item: any) => item.active === true);
      localStorage.setItem("tasks", JSON.stringify(filteredList));
      return filteredList;
    },
  },
});

export const { addTask, removeTask, completeTask, removeCompletedTasks } =
  todoSlice.actions;
export default todoSlice.reducer;
