import React, {Fragment, useEffect, useState} from "react";
import "./InputTodo.css";
import {addTodo} from "../store/calls/Todos";
import {
  addCategory,
  removeCategory,
  getCategories,
} from "../store/calls/Categories";

function InputToDo() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Category");
  const [newCategory, setNewCategory] = useState("New Category");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const user_id = "";
      const response = await getCategories({user_id});
      const jsonData = await response.json();
      console.log(jsonData);
      setCategories(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const user_id = "";
      const user_name = "";
      const body = {user_id, user_name, description, category};
      const response = await addTodo({body});
      refreshList();
    } catch (err) {
      console.error(err.message);
    }
  };

  const refreshList = () => {
    window.location = "/";
  };

  const deleteCategory = async (id) => {
    try {
      const body = {id};
      const response = await removeCategory({body});
      setCategories(
        categories.filter((category) => category.category_id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const addNewCategory = async (e) => {
    e.preventDefault();
    try {
      const user_id = "";
      const body = {name: newCategory, user_id};
      const response = await addCategory({body});
      setCategories([
        ...categories,
        {
          category_id: categories[categories.length - 1].category_id + 1,
          name: newCategory,
        },
      ]);
      setNewCategory("New Category");
      console.log(categories);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center title-input-todo mt-5">TODO</h2>
      <form onSubmit={onSubmitForm} className="d-flex mt-5">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle mr-3"
          data-toggle="dropdown"
        >
          {category}
        </button>
        <div className="dropdown-menu scrollable-menu">
          {categories.map((category) => (
            <div className="dropdown-item d-flex">
              <a
                onClick={() => setCategory(category.name)}
                key={category.category_id}
                className="dropdown-item"
                href="#"
              >
                {category.name}
              </a>
              <button
                onClick={() => deleteCategory(category.category_id)}
                type="button"
                className="btn btn-danger "
              >
                -
              </button>
            </div>
          ))}
          <div className="dropdown-item d-flex">
            <input
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
              value={newCategory}
              key={category.category_id}
              className="dropdown-item mr-3"
              href="#"
            />
            <button
              onClick={(e) => addNewCategory(e)}
              type="button"
              className="btn btn-primary "
            >
              +
            </button>
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success ml-3">Add</button>
      </form>
    </Fragment>
  );
}

export default InputToDo;
