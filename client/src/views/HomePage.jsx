import NewChatButton from '../components/NewChatButton';
import '../styles/Style.css';
import ChatInput from '../components/ChatInput'
import ChatInterface from '../components/ChatInterface'
const HomePage = () => {
    return (
        <div className="main">
            <aside className="sideBar">
                <NewChatButton/>
            </aside>
            <section className="chat">
                <ChatInterface/>
                <ChatInput/>
            </section>
        </div>
    )
}

export default HomePage