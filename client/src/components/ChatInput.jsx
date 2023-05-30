import '../styles/Style.css';
import {useState} from 'react';

const ChatInput = () => {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        setChatLog([...chatLog, {user:"me", message:`${input}`}])
        setInput("");
    }

    return (
        <div className="chatInputContainer">
            <form onSubmit={handleSubmit}>
                <input className="chatInputText" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What would you like to ask?"></input>
            </form>
        </div>
    )
}

export default ChatInput