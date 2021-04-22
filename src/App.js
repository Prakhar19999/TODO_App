import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import {db} from './firebase_config';
import firebase from 'firebase'
import TodoListItem from './Todo';

function App() {

  const [todoInput,setTodoInput]=useState('');
  const [todos,setTodos]=useState([]);

  const addTodo=(e)=>{
    e.preventDefault();

    db.collection("todos").add({
      inprogress:true,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      todo:todoInput,
    });

    setTodoInput('');
  }

  useEffect(()=>{
    getTodos();
  },[])

  const getTodos=()=>{
    db.collection("todos").onSnapshot(function(querySnapshot){
      setTodos(
        querySnapshot.docs.map((doc)=>({
          id:doc.id,
          todo:doc.data().todo,
          inprogress:doc.data().inprogress
        }))
      );
    });
  }

  return (
    <div className="App">
      <div 
      style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:'100%', 
      }}>
        <h1>TODO List</h1>
        <form>
          <TextField 
            id="outlined-basic" 
            label="Write a todo"
            value={todoInput} 
            variant="outlined"
            style={{width:"90vm",maxWidth:"500px"}}
            onChange={(e)=>setTodoInput(e.target.value)}/>
          <Button type="submit"
                  variant="contained" 
                  onClick={addTodo}
                  style={{display:"none"}}>Submit</Button>
        </form>
        <div style={{width:"90vm",maxWidth:"500px",marginTop:"24px"}}>
          {todos.map((todo)=>(
              <TodoListItem 
                todo={todo.todo}
                inprogress={todo.inprogress}
                id={todo.id}/>
              ))}
        </div>
        </div>
    </div>
  );
}

export default App;
