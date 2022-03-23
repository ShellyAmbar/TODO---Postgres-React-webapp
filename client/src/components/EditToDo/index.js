import React, {Fragment, useEffect, useState} from "react";
import {updateTodo} from "../store/calls/Todos";
function EditTodo({todo, onEditComplete}) {
  const [description, setDescription] = useState(todo.description);
  const [category, setCategory] = useState(todo.category);
  const [userName, setUserName] = useState(todo.user_name);

  const editTodo = async (e) => {
    e.preventDefault();
    try {
      const body = {
        id: todo.todo_id,
        description,
        category,
        user_name: userName,
      };
      const response = await updateTodo({body});
      console.log(response);
      onEditComplete();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    resetData();
  }, []);

  const resetData = () => {
    setDescription(todo.description);
    setCategory(todo.category);
    setUserName(todo.user_name);
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => resetData()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit TODO</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => resetData()}
              >
                &times;
              </button>
            </div>

            <div className="modal-body d-flex ">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control ml-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={(e) => editTodo(e)}
                data-dismiss="modal"
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => resetData()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditTodo;
