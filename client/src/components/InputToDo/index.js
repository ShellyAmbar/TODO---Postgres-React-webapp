import React, {Fragment, useEffect, useState} from "react";
import "./InputTodo.css";
function InputToDo() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Category");
  const [newCategory, setNewCategory] = useState("New Category");
  const [categories, setCategories] = useState(["1", "2", "3"]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
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
      const body = {description, category};
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      refreshList();
    } catch (err) {
      console.error(err.message);
    }
  };

  const refreshList = () => {
    window.location = "/";
  };

  const removeCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/categories/${id}`, {
        method: "DELETE",
      });
      setCategories(
        categories.filter((category) => category.category_id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const body = {name: newCategory};
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
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
                onClick={() => removeCategory(category.category_id)}
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
              onClick={(e) => addCategory(e)}
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
