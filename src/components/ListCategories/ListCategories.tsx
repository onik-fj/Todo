import React, { ChangeEvent, FormEvent, useState } from "react";
import "../ListItem/ListItem.css";
import DeleteBTN from "../../img/delete-icon.svg";
import EditBTN from "../../img/edit-icon.svg";
import inputNameImg from "../../img/input-name-img.svg";
import iconClose from "../../img/icon-close.svg";
interface IListItemProps {
  todo: TodoCategories,
  editTodoC: EditTodoCategoties,
  deleteTodo: DeleteTodo
}

export const ListCategories: React.FC<IListItemProps> = ({
  todo,
  editTodoC,
  deleteTodo
}) => {
  const [newTitle, setNewText] = useState("");
  const [newDescription, setNewDescription] = useState("");
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
    deleteTodo(todo, false);
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
  const handleSubmitCategories = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    editTodoC(todo.id ,newTitle, newDescription);
    closeFormEdit(e);
    setStatusDelete(!statusDelete);
    setStatusDelete(!statusEdit);
  };
  const openFormEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatusEdit(!statusEdit);
    setNewText(todo.title);
    setNewDescription(todo.description);
    document.body.classList.add("body-back");
  };
  const closeFormEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatusEdit(!statusEdit);
    document.body.classList.remove("body-back");
    setNewText("");
    setNewDescription("");
  };
  return (
    <div className={"item"}>
      <li className={"item-list"}>
        <label className={"title-item"}>
          <div className={"info-up"}>
            <span className={"item-task"}>{todo.title}</span>
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
        <label className={"title-modal-add"}>{"Редактирование категории"}</label>
        <input
          type="text"
          value={newTitle}
          onChange={handleChangeText}
          required={true}
          className={"input-categories"}
          placeholder="Введите имя задачи"
        />
        <div className={"input-task-name-title"}>
          <span className={"input-task-name-text"}>
            Имя
          </span>
          <img src={inputNameImg} alt="" className={"input-task-name-img"} />
        </div>
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
          onClick={handleSubmitCategories}
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
      <label className={"delete-form-title"}>Удаление категории</label>
        <label className={"delete-form-label"}>Вы действительно хотите удалить "{todo.title}"?</label>
        <button type="submit" onClick={deleteFormDelete} className={"delete-form-accept"}>
        <span className={"delete-form-accept-span"}>Да</span>
        </button>
        <button type="submit" onClick={closeFormDelete} className={"delete-form-cancel"}>
          <span className={"delete-form-cancel-span"}>Нет</span>
        </button>
        <button onClick={closeFormDelete} className={"delete-form-close"}>
          <img src={iconClose} alt="" className={"icon-close"}/>
          </button>
      </form>
    </div>
  );
};