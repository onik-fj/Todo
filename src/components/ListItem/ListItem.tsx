import React, { ChangeEvent, FormEvent, useState } from "react";
import "./ListItem.css";
import DeleteBTN from "../../img/delete-icon.svg";
import EditBTN from "../../img/edit-icon.svg";
import CategoriesBTN from "../../img/folder-icon.svg";
import iconClose from "../../img/icon-close.svg"
import inputNameImg from "../../img/input-name-img.svg";
import { SelectList } from "../SelectList/SelectListEdit";
interface IListItemProps {
  todo: Todo,
  editTodoT: EditTodoTask,
  deleteTodo: DeleteTodo
}

export const ListItem: React.FC<IListItemProps> = ({
  todo,
  editTodoT,
  deleteTodo
}) => {
  const [newTitle, setNewText] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategories, setCategories] = useState("");
  const [statusEdit, setStatusEdit] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);
  const openFormDelete = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.body.classList.add("body-back");
    setStatusDelete(!statusDelete);
  };
  const closeFormDelete = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.body.classList.remove("body-back");
    setStatusDelete(!statusDelete);
  };
  const deleteFormDelete = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatusDelete(!statusDelete);
    deleteTodo(todo, true);
    document.body.classList.remove("body-back");
  };
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
    editTodoT(todo.id, newTitle, newDescription, newCategories);
    closeFormEdit(e);
    setStatusEdit(false);
    setStatusEdit(false);
  };
  const openFormEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatusEdit(!statusEdit);
    setNewText(todo.title);
    setNewDescription(todo.description);
    console.log(todo.categories);
    setCategories(todo.categories? todo.categories:"")
    document.body.classList.add("body-back");

  };
  const closeFormEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatusEdit(!statusEdit);
    document.body.classList.remove("body-back");
    setNewText("");
    setNewDescription("");
  };
  const handleChangeSelecter=(value:string)=>{
    setCategories(value);
  }
  return (
    <div className={"item"}>
      <li className={"item-list"}>
        <label className={"title-item"}>
          <div className={"info-up"}>
            <span className={"item-task"}>{todo.title}</span>
            <img src={CategoriesBTN} alt={"categories-img"} className={!todo.categories ? "categories-img" : "categories-img-show"} />
            <span className={"item-categories"}>{todo.categories}</span>
          </div>
          <div className={"info-bottom"}>{todo.description}</div>
        </label>
        <div className={"item-btn"}>
          <button type="submit" className={"item-edit-btn"} onClick={openFormEdit}>
            <img src={EditBTN} alt={"edit-btn"} />
          </button>
          <button type="submit" onClick={openFormDelete} className={"item-delete-btn"}>
            <img src={DeleteBTN} alt={"delete-btn"} />
          </button>
        </div>
      </li>
      <form className={statusEdit ? "form-add-active" : "form-add"}>
        <label className={"title-modal-add"}>{"Редактирование задачи"}</label>
        <input
          type="text"
          value={newTitle}
          onChange={handleChangeText}
          required={true}
          className={"input-task"}
          placeholder="Введите имя задачи"
        />
        <div className={"input-task-name-title"}>
          <span className={"input-task-name-text"}>
            Имя
          </span>
          <img src={inputNameImg} alt="" className={"input-task-name-img"} />
        </div>
        <SelectList todoTaskC={todo} selector={handleChangeSelecter}/>
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
          onClick={handleSubmitTask}
          className={"form-btn-create"}
        >
          <span className={"form-btn-create-span"}>Сохранить</span>
        </button>
        <button
          type="submit"
          onClick={closeFormEdit}
          className={"form-btn-cancel"}
        >
          <span className={"form-btn-cancel-span"}>Закрыть</span>
        </button>
        <button onClick={closeFormEdit} className={"form-btn-close"}>
          <img src={iconClose} alt="" className={"icon-close"} />
        </button>
      </form>
      <form className={statusDelete ? "form-delete-show" : "form-delete"}>
        <label className={"delete-form-title"}>Удаление задачи</label>
        <label className={"delete-form-label"}>Вы действительно хотите удалить "{todo.title}"?</label>
        <button type="submit" onClick={deleteFormDelete} className={"delete-form-accept"}>
          <span className={"delete-form-accept-span"}>Да</span>
        </button>
        <button type="submit" onClick={closeFormDelete} className={"delete-form-cancel"}>
          <span className={"delete-form-cancel-span"}>Нет</span>
        </button>
        <button onClick={closeFormDelete} className={"delete-form-close"}>
          <img src={iconClose} alt="" className={"icon-close"} />
        </button>
      </form>
    </div>
  );
};