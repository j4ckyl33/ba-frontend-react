import {useContext, useEffect, useState} from "react";
import NoteDeletionInterface from "./NoteDeletionInterface";
import {Context} from "../App";


function UserInterface(){
    const [response, setResponse] = useState([])
    const {value, setValue} = useContext(Context)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if(value.update === true){
            getAllNotes().then(data => setResponse(data))
            setValue({
                update: false,
                showUpdate: false,
                note: null
            })
        }
        console.log(counter)
        setCounter(counter + 1)
    },[value]);

    function getAllNotes(){
       return fetch('http://localhost:8090/note/listnotes', {
           method: 'GET',
           headers: {Accept: 'application/json'}})
           .then(response => response.json())
    }

    async function createMassNotes(){
        await fetch('http://localhost:8090/note/createmassnotes', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                index: -1,
                title: "",
                description: "",
                dueDate: "01.03.2022",
                status: "Idea"
            })
        })
    }

    async function updateMassNotes(){
        await fetch('http://localhost:8090/note/updatemassnotes', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                index: -1,
                title: "",
                description: "",
                dueDate: "01.03.2022",
                status: "Idea"
            })
        })
    }

    async function deleteMassNotes(){
        await fetch('http://localhost:8090/note/deletemassnotes', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                index: -1,
                title: "",
                description: "",
                dueDate: "01.03.2022",
                status: "Idea"
            })
        })
    }

    return(
        <div>
            <button
                onClick={async () => {
                    await createMassNotes()
                    setValue({update: true, showUpdate: false, note: null})
                }}
                className="mt-4 ml-5 bg-green-500 hover:bg-green-400 text-white font-bold mr-4 py-2
                px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                Create Mass Notes
            </button>
            <button
                onClick={async () => {
                    await updateMassNotes()
                    setValue({update: true, showUpdate: false, note: null})
                }}
                className="bg-blue-500 hover:bg-blue-400 text-white mr-4 mt-4 py-2 px-4
                border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Update Mass Notes
            </button>
            <button
                onClick={async () => {
                    await deleteMassNotes()
                    setValue({update: true, showUpdate: false, note: null})
                }}
                className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 border-b-4 border-red-700
                hover:border-red-500 rounded">
                Delete Mass Notes
            </button>
            <ul>
                {Object.entries(response).map((note, key) => {
                    if(value.showUpdate === false) {
                        return (
                            <div className="bg-yellow-200 p-3 m-5 rounded-3xl" key={key}>
                                <div className="ml-4">
                                    <h3 className="font-bold">Title: {note[1].title}</h3>
                                    <li>Index: {note[1].index}</li>
                                    <li>Description: {note[1].description}</li>
                                    <li>Status: {note[1].status}</li>
                                    <li>Due Date: {note[1].dueDate}</li>
                                    <NoteDeletionInterface note={note[1]}></NoteDeletionInterface>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setValue({
                                                update: false,
                                                showUpdate: true,
                                                note: note[1]
                                            })
                                        }}
                                        className="bg-blue-500 hover:bg-blue-400 text-white mr-4 mt-4 py-2 px-4
                                        border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                        Update Note
                                    </button>
                                </div>
                            </div>
                        )
                    }else {
                        return(<div></div>)
                    }
                })}
            </ul>
        </div>
    )
}

export default UserInterface
