import '../styles/Style.css';
import PropTypes from 'prop-types';

const ChatInput = ({ input, setInput, handleSubmit }) => {
    return (
        <div className="chatInputContainer">
            <form onSubmit={handleSubmit}>
                <input className="chatInputText" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What would you like to ask?"></input>
            </form>
        </div>
    )
}

ChatInput.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default ChatInput