import NewChatButton from '../components/NewChatButton';
import '../styles/Style.css';

const HomePage = () => {
    return (
        <div className="main">
            <aside className="sideBar">
                <NewChatButton/>
            </aside>
            <section className="chat">
                <h1>Section</h1>
            </section>
        </div>
    )
}

export default HomePage