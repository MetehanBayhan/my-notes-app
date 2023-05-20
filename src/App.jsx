import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function App() {

    const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        () => (notes[0] && notes[0].id) || ""
    )

    React.useEffect(()=>{
        localStorage.setItem("notes", JSON.stringify(notes))

        //* This code whenever notes array updates, it places the code that modified on top *
        // let currentItemIndex = notes.indexOf(findCurrentNote())
        // var item = notes.splice(currentItemIndex, 1)[0];
        // notes.unshift(item);
    },[notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here",
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
            const updatedNotesArray = []
            for(let note of oldNotes){
                if(currentNoteId == note.id){
                    updatedNotesArray.unshift({...note, body:text})
                } else {
                    updatedNotesArray.push(note)
                }
            }
            return updatedNotesArray
        })


        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId
        //         ? { ...oldNote, body: text}
        //         : oldNote
        // }))
    }

        /**
     * Hints: 
     * 1. What array method can be used to return a new
     *    array that has filtered out an item based 
     *    on a condition?
     * 2. Notice the parameters being based to the function
     *    and think about how both of those parameters
     *    can be passed in during the onClick event handler
     */
    
    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => noteId != note.id))
    }

    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
