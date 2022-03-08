import {useContext, useEffect, useState} from "react";
import {getAllNotes} from "../services/SharedServices";
import NoteDeletionInterface from "./NoteDeletionInterface";
import {Context} from "../App";


function UserInterface(){
    const [response, setResponse] = useState([])
    const {value, setValue} = useContext(Context)

    useEffect(() => {
        if(value.update === true){
            console.log('reahced')
            getAllNotes().then(response => setResponse(response))
            setValue({update: false, showUpdate: false, note: null})
        }
        console.log(value)
    },[value]);

    return(
        <ul>
            {Object.entries(response).map((note, key) => {
                return(
                    <div className="bg-yellow-200 p-3 m-5 rounded-3xl" key={key}>
                        <div className="ml-4">
                            <h3 className="font-bold">Title: {note[1].title}</h3>
                            <li>Index: {note[1].index}</li>
                            <li >Description: {note[1].description}</li>
                            <li >Status: {note[1].status}</li>
                            <li>Due Date: {note[1].dueDate}</li>
                            <NoteDeletionInterface note={note[1]}></NoteDeletionInterface>
                            <button type="button" onClick={() => {setValue({update: false, showUpdate: true, note: note[1]})}} className=" bg-blue-500 hover:bg-blue-400 text-white mr-4 mt-4 py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Update Note</button>
                        </div>
                    </div>
                )
            })}
        </ul>
    )
}

export default UserInterface
