import {useContext, useEffect, useState} from "react";
import {handleClickNoteCreation, getAllNotes} from "../services/SharedServices";
import {Context} from "../App";

function NoteCreationInterface() {
    const [createClicked, setCreateClicked] = useState(false)
    const {setValue} = useContext(Context)
    let newDateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }
    const [note, setNote] = useState(null)

    useEffect(async () => {
        if (!createClicked) {
            let highestIndex = 0
            const response = await getAllNotes()
            response.forEach(note => {
                if (note.index > highestIndex) {
                    highestIndex = note.index
                }
            })
            highestIndex += 1
            setNote({
                index: highestIndex,
                title: "",
                description: "",
                dueDate: new Date().toLocaleString("en-US", newDateOptions),
                status: "Idea"})
        }
    }, [createClicked])

    function changeHandler(e) {
        setNote({...note, [e.target.name]: e.target.value})
    }
    if(createClicked) {
        return (
            <form className="bg-blue-200 p-3 m-5 rounded-3xl">
                <div className="ml-4">
                    <h2>Create Note:</h2>
                    <label>Index: </label>
                    <span>{note.index}</span>
                    <label className="ml-2 mr-2">Title:</label>
                    <input type="text" name="title" value={note.title} onChange={changeHandler}/>
                    <label className="ml-2 mr-2">Description:</label>
                    <input type="text" name="description" value={note.description} onChange={changeHandler}/>
                    <label className="ml-2 mr-2">Due Date:</label>
                    <input type="text" name="dueDate" value={note.dueDate} onChange={changeHandler}/>
                    <label className="ml-2 mr-2">Status:</label>
                    <select name="status" value={note.status} onChange={changeHandler}>
                        <option value="Idea">Idea</option>
                        <option value="ToDo Next">ToDo Next</option>
                        <option value="Doing">Doing</option>
                        <option value="in Review">in Review</option>
                        <option value="Done">Done</option>
                    </select>
                    <button
                        type="button"
                        className="mt-4 ml-5 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                        onClick={() => {
                            handleClickNoteCreation(note);
                            setCreateClicked(false);
                            setValue({update: true, showUpdate: false, note: null})
                        }}>Create
                    </button>
                </div>
            </form>
        )
    }else {
        return (
            <div>
                <button type="button"
                    className="mt-4 ml-5 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                    onClick={() => setCreateClicked(true)}>Create Note
                </button>
            </div>
        )
    }
}

export default NoteCreationInterface