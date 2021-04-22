import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import {db} from './firebase_config';
import firebase from 'firebase'

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
    <div 
    className="App"
    style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
    }}>
      <div>
        <h1>TODO List</h1>
        <form>
          <TextField 
            id="outlined-basic" 
            label="Write a todo"
            value={todoInput} 
            variant="outlined" 
            style={{maxWidth:"500px",width:"90vm"}}
            onChange={(e)=>setTodoInput(e.target.value)}/>
          <Button type="submit"
                  variant="contained" 
                  onClick={addTodo}
                  style={{display:"none"}}>Submit</Button>
        </form>

        {todos.map((todo)=>(
          <p>{todo.todo}</p>
        ))}

        </div>
    </div>
  );
}

export default App;
