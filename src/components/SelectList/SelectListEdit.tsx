import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import "./SelectList.css";
interface ISelectListProps {
  selector: Selector;
  todoTaskC: Todo
}
export const SelectList: React.FC<ISelectListProps> = ({ todoTaskC, selector }) => {
  const todoList = useSelector((state: RootState) => state);
  const handleSelecter = (e: ChangeEvent<HTMLSelectElement>) => {
    selector(e.target.value);
  };
  return (
    <>
      <span className={"select-title"}>Категория</span>
      <select onChange={handleSelecter} className={"select-list"}>
        <option value={todoTaskC.id} className={"option-item"}>{todoTaskC.categories}</option>
        {todoList.todosCategories.map((todo) => {
          return (todoTaskC.categories !== todo.title) ? <option className={"option-item"} key={todo.id} value={todo.title}>{todo.title}</option> : null;
          // if(todoTaskC.categories!==todo.title){
          //   return <option className={"option-item"} key={todo.id} value={todo.title}>{todo.title}</option>
          // }
        }
        )}
      </select>
    </>);
};