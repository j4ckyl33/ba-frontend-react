import {useContext} from "react";
import {Context} from "../App";

function NoteDeletionInterface({note}){
    const {setValue} = useContext(Context)

    async function handleClickNoteDeletion(note){
        await fetch('http://localhost:8090/note/deletenote', {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(note)
        })
    }

    return(
        <button
            type="button"
            className=" bg-red-500 hover:bg-red-400 text-white py-2 px-4 border-b-4 border-red-700
            hover:border-red-500 rounded"
            onClick={ async() => {
                await handleClickNoteDeletion(note);
                setValue({
                    update: true,
                    showUpdate: false,
                    note: null
                })
            }}>
            Delete Note
        </button>
    )
}

export default NoteDeletionInterface