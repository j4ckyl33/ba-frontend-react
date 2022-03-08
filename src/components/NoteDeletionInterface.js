import {handleClickNoteDeletion} from "../services/SharedServices";
import {useContext} from "react";
import {Context} from "../App";

function NoteDeletionInterface({note}){
    const {setValue} = useContext(Context)
    return(
        <button type="button" className=" bg-red-500 hover:bg-red-400 text-white py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={ () => {handleClickNoteDeletion(note); setValue({update: true, showUpdate: false, note: null})}}>Delete Note</button>
    )
}

export default NoteDeletionInterface