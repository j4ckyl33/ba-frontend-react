export function getAllNotes(){
    return fetch('http://localhost:8090/note/listnotes', {
        method: 'GET',
        headers: {Accept: 'application/json'}})
        .then(response => response.json())
}

export function handleClickNoteCreation(note, e){
    if(note.title !== "" && note.description !== "" && note.dueDate !== ""){
        fetch('http://localhost:8090/note/createnote', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(note)
        }).then(() => {
        })
    }else{
        alert("One or more inputs are missing")
    }
}

export function handleClickNoteDeletion(note){
    fetch('http://localhost:8090/note/deletenote', {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    }).then(() => {
    })
}

export function handleClickNoteUpdate(note){
    return fetch('http://localhost:8090/note/updatenote', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    })
        .then()
}