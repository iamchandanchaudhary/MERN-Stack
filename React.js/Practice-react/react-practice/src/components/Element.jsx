import ChatBotIcon from "./ElementIcon";

function ChatBot() {
    return (
        <div className="container font-[poppins]">
            <div className="chatbot-popup w-[420px] overflow-hidden bg-[#fff] rounded-lg shadow-lg">
                {/* ChatBox header  */}
                <div className="chat-header flex px-6 py-4 items-center justify-between bg-[#6d4fc2]">
                    <div className="header-info flex gap-3 items-center">

                        <ChatBotIcon />
                        <h2 className="logo-text">ChatBot</h2>

                    </div>
                    <button className="material-symbols-outlined">keyboard_arrow_down</button>
                </div>

                {/* Chat body */}
                <div className="chat-body">
                    <div className="massage bot-massage">
                        <ChatBotIcon />
                        <p className="massage-text">
                            Heyy there 👋,<br /> How can i help you today?
                        </p>
                    </div>

                    <div className="massage user-massage">
                        <p className="massage-text">
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div>

                {/* Chat footer */}
                <div className="chat-footer">
                    <form action="#" className="chat-form">
                        <input type="text" className="massage-input" placeholder="massage..." required />

                        <button className="material-symbols-outlined">keyboard_arrow_up</button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;