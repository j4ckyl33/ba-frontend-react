import './App.css';
import UserInterface from "./components/UserInterface";
import NoteCreationInterface from "./components/NoteCreationInterface";
import {createContext, useState} from "react";
import NoteUpdateInterface from "./components/NoteUpdateInterface";

export const Context = createContext({ value: {getNotes: true, showUpdate: false, note: null}, setValue: () => {} });

function App() {
    const [value, setValue] = useState({update: true, showUpdate: false, note: null})
    return (
    <div className="App">
        <Context.Provider value={{value, setValue}}>
            <h1 className="bg-yellow-200 flex justify-center p-5 font-bold text-4xl">Notable</h1>
            <NoteCreationInterface />
            <NoteUpdateInterface/>
            <UserInterface />
        </Context.Provider>
    </div>
  );
}

export default App;
