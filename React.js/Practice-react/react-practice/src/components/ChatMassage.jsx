import ChatBotIcon from "./ChatBotIcon";

function ChatMassage({ chat }) {

    return (
        <div className={`massage ${chat.role === "model" ? "bot" : "user"}-massage flex gap-3 flex-col items-end`}>
            {chat.role === "model" && <ChatBotIcon />}
            <p className="massage-text px-4 py-3 max-w-[75%] text-[15px] bg-[#6d4fc2] text-[#fff] rounded-s-xl rounded-tr-xl rounded-br-sm">
                {chat.text}
            </p>
        </div>
    );
}

export default ChatMassage;