import NewChatButton from '../components/NewChatButton';
import '../styles/Style.css';
import ChatInput from '../components/ChatInput'
import ChatOutput from '../components/ChatOutput';
import { useState } from 'react';

const HomePage = () => {
    const REACT_APP_OPEN_API_KEY="YOUR_API_KEY_HERE"
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
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            return data.json();
        }).then((data) => {
            if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                console.log(data.choices[0].message.content);
                setChatLog(
                    [...chatMessages, {
                        message: data.choices[0].message.content,
                        sender: "ChatGPT"
                    }]
                )
            } else {
                throw new Error("Unexpected API response structure");
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
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
