import React, {Fragment, useState} from "react";

function InputToDo() {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {description};
      const response = await fetch("http://localhost:5000/todos", {
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

  return (
    <Fragment>
      <div className="text-center mt-5">To do list</div>
      <form onSubmit={onSubmitForm} className="d-flex mt-5">
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
