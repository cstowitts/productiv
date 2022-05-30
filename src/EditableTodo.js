import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

/** Show editable todo item.
 *
 * Props
 * - todo
 * - update(): fn to call to update a todo
 * - remove(): fn to call to remove a todo
 *
 * State
 * - isEditing: bool, tracks whether a todo is currently being edited
 *     and will render form to do update
 *
 * EditableTodoList -> EditableTodo -> { Todo, TodoForm }
 */

function EditableTodo({todo, update, remove}) {

  const [isEditing, setIsEditing] = useState(false);

  /** Toggle if this is being edited */
  function toggleEdit() {
    const status = isEditing ? false : true;
    setIsEditing(status);
  }

  /** Call remove fn passed to this. */
  function handleDelete(todo) {
    remove(todo.id);
  }

  /** Edit form saved; toggle isEditing and update in ancestor. */
  function handleSave(formData) {
    toggleEdit();
    update(formData);
  }

  return (
      <div className="EditableTodo">

                {isEditing &&
                    <TodoForm todo={todo} handleSave={handleSave}/>
                }
                {!isEditing &&
                  <div className="mb-3">
                    <div className="float-end text-sm-end">
                      <button
                          className="EditableTodo-toggle btn-link btn btn-sm"
                          onClick={toggleEdit}>
                        Edit
                      </button>
                      <button
                          className="EditableTodo-delBtn btn-link btn btn-sm text-danger"
                          onClick={handleDelete}>
                        Del
                      </button>
                    </div>
                    <Todo />
                  </div>
                }

      </div>
  );
}

export default EditableTodo;
