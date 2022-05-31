import React, { useState } from "react";

/** Form for adding.
 *
 * Props:
 * - initialFormData
 * - handleSave: function to call in parent.
 *
 * { TodoApp, EditableTodo } -> TodoForm
 */

const defaultTodoFormData = {
  title: "",
  description: "",
  priority: 1,
}

function TodoForm({initialFormData=defaultTodoFormData, handleSave}) {

  const [formData, setFormData] = useState(initialFormData);

  /** Update form input. */
  function handleChange(evt) {
    //functional idiom
    const input = evt.target;
    setFormData(fData => ({
      ...fData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    //don't forget to prevent the default page refresh behavior on submit!
    evt.preventDefault();
    handleSave(formData);
    //and don't forget to clear the form after adding the new todo
    setFormData(initialFormData);
  }

  return (
      <form className="NewTodoForm" onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
              id="newTodo-title"
              name="title"
              className="form-control"
              placeholder="Title"
              onChange={handleChange}
              value={initialFormData.title}
              aria-label="Title"
          />
        </div>

        <div className="mb-3">
          <textarea
              id="newTodo-description"
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={handleChange}
              value={initialFormData.description}
              aria-label="Description"
          />
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <div className="w-75 d-flex justify-content-between">
            <label htmlFor="newTodo-priority"
                   className="d-inline-flex">Priority:&nbsp;&nbsp;
            </label>
            <select id="newTodo-priority"
                    name="priority"
                    value={initialFormData.priority}
                    onChange={handleChange}
                    className="form-control form-control-sm d-inline-flex"
            >
              <option value={1}>Ultra-Über</option>
              <option value={2}>Über</option>
              <option value={3}>Meh</option>
            </select>
          </div>
          <button className="btn-primary rig btn btn-sm NewTodoForm-addBtn">
            Gø!
          </button>
        </div>

      </form>
  );
}

export default TodoForm;
