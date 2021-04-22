 import { Button, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { db } from './firebase_config';


 export default function TodoListItem ({ todo,inprogress,id }){

    function toggleInProgress(){
        db.collection("todos").doc(id).update({
            inprogress:!inprogress,
        })
    }
     return(
         <div style={{display:"flex"}}>
             <ListItem>
                    <ListItemText primary={todo} secondary={inprogress?"In Progress":"Completed"}/>
             </ListItem>
             <Button onClick={toggleInProgress}>{inprogress ? "Done":"Undone"}</Button>
             <Button>X</Button>
         </div>
     );
 }