import {useContext} from "react";
import { Context} from "../App";
import {handleClickNoteUpdate} from "../services/SharedServices";

function NoteUpdateInterface() {
    const {value, setValue} = useContext(Context)

    function changeHandler(e) {
        setValue({update: false, showUpdate: true, note: {...value.note, [e.target.name]: e.target.value}})
    }

    if(value.showUpdate === true){
        return (
            <form className="bg-blue-200 p-3 m-5 rounded-3xl">
                <div className="ml-4">
                    <h2 className="font-bold">Update Item:</h2>
                    <span>Index: {value.note.index}</span>
                    <label className="ml-2 mr-2">Title: </label>
                    <input type="text" name="title" value={value.note.title} onChange={changeHandler}/>
                    <label className="ml-2 mr-2">Description:</label>
                    <input type="text" name="description" value={value.note.description} onChange={changeHandler}/>
                    <label className="ml-2 mr-2">Due Date:</label>
                    <input type="text" name="dueDate" value={value.note.dueDate} onChange={changeHandler}/>
                    <label className="ml-2 mr-2">Status:</label>
                    <select name="status" value={value.note.status} onChange={changeHandler}>
                        <option value="Idea">Idea</option>
                        <option value="ToDo Next">ToDo Next</option>
                        <option value="Doing">Doing</option>
                        <option value="in Review">in Review</option>
                        <option value="Done">Done</option>
                    </select>
                    <br/>
                    <button type="button" onClick={() => {
                        handleClickNoteUpdate(value.note);
                        setValue({update: true, showUpdate: false, note: null})
                    }}
                            className=" mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Finish
                        Update
                    </button>
                </div>
            </form>
        )
    }else{
        return(<div></div>)
    }
}

export default NoteUpdateInterface