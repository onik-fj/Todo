import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Header.css";
import { SelectListAdd } from "../SelectList/SelectListAdd";
import Tasks from "../../img/menu-img.svg";
import inputNameImg from "../../img/input-name-img.svg";
import iconClose from "../../img/icon-close.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface IHeaderProps {
  addTodoItem: AddTodoItem,
  addTodoCategories: AddTodoCategories,
  changeTodoItem: ChangeTodoItem
}
export const Header: React.FC<IHeaderProps> = ({ addTodoItem, addTodoCategories, changeTodoItem }) => {
  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const [newTitle, setNewText] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategories, setCategories]=useState("");
  const [status, setStatus] = useState(false);
  const btnTaks= document.getElementById("btnTask");
  const btnCategories= document.getElementById("btnCategories");
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewText(e.target.value);
  };
  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setNewDescription(e.target.value);
  };
  const handleSubmitTask = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(newTitle==="" && newDescription===""){
      alert(`Поля "Имя" и "Описание" пустые, заполните пожалуйста`);
    }else{
      document.body.classList.remove("body-back");
      addTodoItem(newTitle, newDescription, newCategories);
      closeFormAdd(e);
      setStatus(!status);
    }
  };
  const handleSubmitCategories = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(newTitle==="" && newDescription===""){
      alert(`Поля "Имя" и "Описание" пустые, заполните пожалуйста`);
    }else{
      document.body.classList.remove("body-back");
      addTodoCategories(newTitle, newDescription);
      closeFormAdd(e);
      setStatus(!status);
    }
  };
  const openFormAdd = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus(!status);
    document.body.classList.add("body-back");
  };
  const closeFormAdd = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.body.classList.remove("body-back");
    setStatus(!status);
    setNewText("");
    setNewDescription("");
  };
  const handlerChangeToCategories = (e: any) => {
    e.preventDefault();
    btnTaks?.classList.remove("header-btn-active");
    btnTaks?.classList.add("header-btn");
    btnCategories?.classList.add("header-btn-active");
    btnCategories?.classList.remove("header-btn");
    changeTodoItem(false);
  };
  const handlerChangeToTask = (e: any) => {
    e.preventDefault();
    btnCategories?.classList.remove("header-btn-active")
    btnCategories?.classList.add("header-btn");
    btnTaks?.classList.add("header-btn-active");
    btnTaks?.classList.remove("header-btn");
    changeTodoItem(true);
  };
  const handleChangeSelecter=(value:string)=>{
    setCategories(value);
  }
  return (
    <>
      <header className={"header"}>
        <nav className={"header-nav"}>
          <label className={"title-label"}>Todo List</label>
          <nav className={"header-menu"}>
            <button id={"btnTask"} className={"header-btn-active"} onClick={handlerChangeToTask}>Задачи</button>
            <img src={Tasks} alt={"tasks"} className={"header-img"} />
            <button id={"btnCategories"} className={"header-btn"} onClick={handlerChangeToCategories}>Категории</button>
          </nav>
        </nav>
        {todoList.completed ? <button type="submit" onClick={openFormAdd} className={"btn-add"}>
          Добавить задачу
        </button> : <button type="submit" onClick={openFormAdd} className={"btn-add"}>
          Добавить категорию
        </button>}
      </header>
      <form className={status ? "form-add-active" : "form-add"}>
        <label className={"title-modal-add"}>{todoList.completed ? "Создание задачи": "Создание категории"}</label>
        <input
          type="text"
          value={newTitle}
          onChange={handleChangeText}
          required={true}
          className={todoList.completed ?"input-task":"input-categories"}
          placeholder="Введите имя задачи"
        />
        <div className={"input-task-name-title"}>
          <span className={"input-task-name-text"}>
            Имя
          </span>
          <img src={inputNameImg} alt="" className={"input-task-name-img"} />
        </div>
        {todoList.completed ? <SelectListAdd selector={handleChangeSelecter}/>: null}
        <div className={"input-description-name-text"}>
          Описание
        </div>
        <textarea
          value={newDescription}
          onChange={handleChangeDescription}
          required={true}
          className={"input-description"}
          placeholder="Введите описание задачи"
        />
        <button
          type="submit"
          onClick={todoList.completed?handleSubmitTask:handleSubmitCategories}
          className={"form-btn-create"}
        >
          <span className={"form-btn-create-span"}>Создать</span>
        </button>
        <button
          type="submit"
          onClick={closeFormAdd}
          className={"form-btn-cancel"}
        >
          <span className={"form-btn-cancel-span"}>Закрыть</span>
        </button>
        <button onClick={closeFormAdd} className={"form-btn-close"}>
          <img src={iconClose} alt="" className={"icon-close"} />
        </button>
      </form>
    </>
  );
};