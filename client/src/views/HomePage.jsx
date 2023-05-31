import NewChatButton from '../components/NewChatButton';
import '../styles/Style.css';
import ChatInput from '../components/ChatInput'
import ChatOutput from '../components/ChatOutput';
import { useState } from 'react';

const HomePage = () => {
    const REACT_APP_OPEN_API_KEY="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"
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([{
        sender: "ChatGPT",
        message: "How can I help you?",
    },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = {
            sender: "user",
            message: input,
        }
        const newMessages = [...chatLog, newMessage];
        setChatLog(newMessages);
        setInput("");
        await processToChatGPT(newMessages);
    }

    async function processToChatGPT(chatMessages) {

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            }
            return { role: role, content: messageObject.message }
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + REACT_APP_OPEN_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data.choices[0].message.content);
            setChatLog(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            )
        })
    }


    return (
        <div className="main">
            <aside className="sideBar">
                <NewChatButton />
            </aside>
            <section className="chat">
                <div className="chatInterface">
                    {chatLog.map((message, index) => (
                        <ChatOutput key={index} message={message} />
                    ))}
                </div>
                <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
            </section>
        </div>
    );
}
export default HomePage;