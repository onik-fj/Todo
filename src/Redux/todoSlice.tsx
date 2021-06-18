import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let todosTask: Array<Todo> = [];
let todosCategories: Array<TodoCategories> = [];

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todosTask,
    todosCategories,
    completed: true
  },
  reducers: {
    addTodoCateg: {
      reducer: (state, action: PayloadAction<TodoCategories>) => {
        state.todosCategories.push(action.payload);
      },
      prepare: (id: string, title: string, description: string) => ({
        payload: {
          id,
          title,
          description
        }
      }),
    },
    addTodoTask: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todosTask.push(action.payload);
      },
      prepare: (id: string, title: string, description: string, categories: string) => ({
        payload: {
          id,
          title,
          description,
          categories
        }
      }),
    },
    editTodoTask: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todosTask.map(todo => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.description = action.payload.description;
            todo.categories = action.payload.categories;
          }
          return todo;
        });
      },
      prepare: (id: string, title: string, description: string, categories: string) => ({
        payload: {
          id,
          title,
          description,
          categories
        }
      }),
    },
    editTodoCategories: {
      reducer: (state, action: PayloadAction<TodoCategories>) => {
        state.todosCategories.map(todo => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.description = action.payload.description;
          }
          return todo;
        });
      },
      prepare: (id: string, title: string, description: string) => ({
        payload: {
          id,
          title,
          description
        }
      }),
    },

  removeTodoTask(state, action: PayloadAction<Todo>) {
    state.todosTask.map((todo) => {
      return (todo.id===action.payload.id)? state.todosTask.splice(state.todosTask.indexOf(todo), 1):null;
      // if(todo.id===action.payload.id)
      // { 
      //   return state.todosTask.splice(state.todosTask.indexOf(todo), 1);
      // }
    })
  },
  removeTodoCategories(state, action: PayloadAction<TodoCategories>) {
    state.todosCategories.map((todo) => {
      return (todo.id===action.payload.id)? state.todosCategories.splice(state.todosCategories.indexOf(todo), 1):null;
      // if(todo.id===action.payload.id)
      // { 
      //   return state.todosCategories.splice(state.todosCategories.indexOf(todo), 1);
      // }
    })
  },
  getTodoTask(state, action: PayloadAction<Array<Todo>>) {
    action.payload.map((todo) => state.todosTask.push(todo));
  },
  getTodoCategories(state, action: PayloadAction<Array<TodoCategories>>) {
    action.payload.map((todo) => state.todosCategories.push(todo));
  },
  changeTodo(state, action: PayloadAction<boolean>) {
    state.completed = action.payload
  }
},
});

export const { addTodoTask, removeTodoTask, removeTodoCategories, getTodoTask, getTodoCategories, changeTodo, addTodoCateg, editTodoTask, editTodoCategories } = todoSlice.actions;
export default todoSlice.reducer;