import React, { FormEvent, useState } from "react";
import "../ListItem/ListItem.css";
import DeleteBTN from "../../img/delete-icon.svg";
import EditBTN from "../../img/edit-icon.svg";
import inputNameImg from "../../img/input-name-img.svg";
import iconClose from "../../img/icon-close.svg";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
interface IListItemProps {
  todo: TodoCategories,
  editTodoC: EditTodo,
  deleteTodo: DeleteTodo
}

export const ListCategories: React.FC<IListItemProps> = ({
  todo,
  editTodoC,
  deleteTodo
}) => {
  const [statusEdit, setStatusEdit] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);
  let oldCategories = todo.title;
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
  const openFormEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatusEdit(!statusEdit);
    document.body.classList.add("body-back");
  };
  const handleSubmitT = (todo: Todo) => {
    setStatusEdit(false);
    editTodoC(todo.id, todo.title, todo.description, oldCategories);
    document.body.classList.remove("body-back");
  }
  const closeFormEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatusEdit(false);
    document.body.classList.remove("body-back");
  };
  const handleValidSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Поле должно быть заполнено'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(512, 'Too Long!')
      .required('Поле должно быть заполнено'),
  });
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
      <Formik
        initialValues={todo
        }
        validationSchema={handleValidSchema}
        onSubmit={(
          values: Todo
        ) => {
          handleSubmitT(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={statusEdit ? "form-edit-task-active" : "form-edit-task"}>
            <label className={"label-edit-task"}>{"Редактирование категории"}</label>
            <div className={"edit-title-task"}>
              <label className={"edit-title"} htmlFor="title">Имя</label>
              <img src={inputNameImg} alt="" className={"edit-title-img"} />
            </div>
            <Field className={"edit-field-title-categories"} name="title" placeholder="Введите имя категории" />
            {errors.title && touched.title ? (
              <div className={"error-field-title"}>{errors.title}</div>
            ) : null}

            <label className={"edit-desctiption"} htmlFor="description">Описание</label>
            <Field className={"edit-field-desctiption"} name="description" placeholder="Введите описание категории" />
            {errors.description && touched.description ? (
              <div className={"error-field-description"}>{errors.description}</div>
            ) : null}
            <button type="submit" className={"btn-edit-save"}>Сохранить</button>
            <button type="button" onClick={closeFormEdit} className={"btn-edit-cancel"}>Закрыть</button>
          </Form>
        )}
      </Formik>
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