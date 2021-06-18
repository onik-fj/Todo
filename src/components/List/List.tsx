import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { ListCategories } from "../ListCategories/ListCategories";
import { ListItem } from "../ListItem/ListItem";
import "./List.css";

interface IListProps{
  deleteTodo : DeleteTodo,
  editTodoT: EditTodoTask,
  editTodoC: EditTodoCategoties
}

export const List: React.FC<IListProps> = ({deleteTodo, editTodoT, editTodoC}) => {
  const todoList = useSelector((state: RootState) => state);
  return (
    <section>
      <div className={"container-list"}>
        <ul className={"list"}>
          
          {todoList.completed?((todoList.todosTask.length===0)?<span className={"list-empty"}>Список задач пуст</span>: todoList.todosTask.map((todo) => {
            return (
              <ListItem
                key={todo.id}
                todo={todo}
                editTodoT={editTodoT}
                deleteTodo={deleteTodo}
              />
            );
          })):((todoList.todosCategories.length===0)?<span className={"list-empty"}>Список категорий пуст</span>:todoList.todosCategories.map((todo)=>{
            return(
              <ListCategories
                key={todo.id}
                todo={todo}
                editTodoC={editTodoC}
                deleteTodo={deleteTodo}
              />
            )
          }))}
        </ul>
      </div>
    </section>
  );
};
