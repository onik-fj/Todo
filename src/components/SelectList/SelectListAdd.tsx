import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import "./SelectList.css";
interface ISelectListProps {
  selector: Selector;
}
export const SelectListAdd: React.FC<ISelectListProps> = ({ selector }) => {
  const todoList = useSelector((state: RootState) => state);
  const handleSelecter = (e: ChangeEvent<HTMLSelectElement>) => {
    selector(e.target.value);
  };
  return (
    <>
    <span className={"select-title"}>Категория</span>
      <select onChange={handleSelecter} className={"select-list"}>
        <option value="" className={"option-item"}>{"Выберите категорию"}</option>
        {todoList.todosCategories.map((todo) =>
            <option className={"option-item"} key={todo.id} value={todo.title}>{todo.title}</option>
        )}
      </select>
  </>);
};