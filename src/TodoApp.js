import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";

/** App for managing a todo list.
 *
 * Props:
 * - initialTodos: possible array of todo objs 
 *    like [ {id, title, description, priority}, {todo}, ... ]
 *
 * State:
 * - todos: array of todo objs 
 *    like [ {id, title, description, priority}, {todo}, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

function TodoApp({initialTodos}) {

  const [todos, setTodos] = useState(initialTodos);

  /** add a new todo to list */
  function create(newTodo) {
    //new array identity, spread todos and add newTodo,
    //giving the newest one a unique id 
    //bc the new state is computed using the previous state,
    //we use the functional form and pass a function to the setter
    setTodos(todos => [...todos, {id: uuid(), ...newTodo}]);
  }

  /** update a todo with updatedTodo */
  function update(updatedTodo) {
    for(let todoIdxStr in todos){
      let todoIdx = Number(todoIdxStr);
      if(todos[todoIdx].id === updatedTodo.id){
        todos[todoIdx] = {
          id: updatedTodo.id,
          title: updatedTodo.title,
          description: updatedTodo.description,
          priority: updatedTodo.priority
        }
        break;
      }
    }
    setTodos([...todos]);
  }

  /** alternate update fn:
   * function update(updatedTodo){
   *    setTodos(todos => todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
   * }
   */

  /** delete a todo by id */
  function remove(id) {
    for(let todoIdxStr in todos){
      //when you use a for..in on an arr, the idx is a str type
      //which makes sense for iterating over an obj's keys
      //so you gotta convert it to a number to use it as an idx for an array
      console.log("in remove fn, todoIdxStr = ", todoIdxStr);
      let todoIdx = Number(todoIdxStr);
     if(todos[todoIdx].id === id){
       todos.splice(todoIdx, 1);
       //is this an issue bc when you mutate the todos state array with splice, it automatically rerenders 
     }
     break;
   }  
   setTodos([...todos]);
  }

  /** alternate remove fn:
   * function remove(id){
   *    setTodos(todos => todos.filter(todo => todo.id !== id));
   * }
   */

  //don't forget you can use ternarys in your jsx!
  return (
      <main className="TodoApp">
        <div className="row">
          <div className="col-md-6">
            {todos.length > 0 
              ? <EditableTodoList 
                  todos={todos} 
                  update={update} 
                  remove={remove}/>
              : <span className="text-muted">You have no todos.</span>
            }
          </div>

          <div className="col-md-6">
            {todos.length > 0 &&
              <section className="mb-4">
                <h3>Top Todo</h3>
                <TopTodo todos={todos} />
              </section>
            }
           
            <section>
              <h3 className="mb-3">Add Nü</h3>
              <TodoForm handleSave={create}/>
            </section>
          </div>

        </div>
      </main>
  );
}

export default TodoApp;