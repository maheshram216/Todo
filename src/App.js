import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import "./App.css"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(true);
  const [todoId, setTodoId] = useState();
  // const [err, setErr] = useState("")

  const toogleButton = () => {
    if (input === "") {
      toast.error("Please provide input", {
        position: "top-center",
        theme: "colored",
      })
      // setErr("Enter input")
    }
    else if (input && !toggle) {
      setTodos(
        todos.map((items, index) => {
          if (todoId === index) {
            return (input);
          }
          return items;
        })
      )
      setToggle(true);
      setInput("")
      setTodoId(null);
      // setErr("")
    }
    else {
      // toast.success("Added todo")
      setTodos([...todos, input]);
      setInput("");
      // setErr("")
    };
  };

  const toggleInput = (e) => {
    setInput(e.target.value);
  };

  const toggleDelete = (id) => {
    // toast.success("deleted successfully", { theme: 'colored' })
    const newTodos = todos.filter((items, index) => {
      return index !== id
    });
    setTodos(newTodos);
  };

  const toggleEdit = (id) => {
    console.log(id);
    const editTodo = todos.find((items, index) => {
      return id === index
    });
    setInput(editTodo);
    setToggle(false);
    setTodoId(id);
  };

  const removeTodos = () => {
      setTodos([]);
  
  }

  return (
    <div className="App">
      <input className=" input-btn" onChange={toggleInput} value={input} placeholder='Enter todos...'></input>
      {toggle ? <button className="btn btn-primary add-btn" onClick={toogleButton}><AddIcon /></button> : <button className="btn btn-primary" onClick={toogleButton}><BorderColorIcon/></button>}
      {/* <div style={{color:"red"}}> {err}</div> */}
      {todos.map((items, index) => {
        return (
          <p className='list' key={index}> <span>{items}</span>
            <button className="btn btn-danger delete-btn" onClick={() => toggleDelete(index)}><ClearIcon /></button>

            <button className="btn btn-info edit-btn " onClick={() => toggleEdit(index)}><BorderColorIcon /></button>
          </p>
        )
      })}
      <br />
      <button className="btn btn-dark" onClick={removeTodos} title='remove'>Removeall</button>
      <ToastContainer />
    </div>
  );
}

export default App;