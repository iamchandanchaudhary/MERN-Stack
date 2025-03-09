import { useRef } from "react";

function ChatForm({setChatHistory}) {

    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const userMassage = inputRef.current.value.trim();

        if(!userMassage) return;
        inputRef.current.value = "";

        // Update chat history with the user's massage
        setChatHistory(history => [...history, { role: "user", text: userMassage }]);

        // Add a "thinking..." placeholder for bot response
        setTimeout(() => setChatHistory((history) => [...history, { role: "model", text: "thinking..." }]), 600);
    };

    return (
        <form action="#" onSubmit={handleFormSubmit}
        className="chat-form flex items-center bg-[#fff] outline-[1px] outline-dashed outline-[#cccce5] rounded-2xl drop-shadow-lg  focus-within:outline-[2px] focus-within:outline-[#6d4fc2] focus-within:outline-double">
            <input type="text" ref={inputRef}
            className="massage-input border-none outline-none bg-none h-12 w-[100%] px-4 text-[16px] rounded-2xl " 
            placeholder="massage..." 
            required />

            <button 
            className="material-symbols-outlined h-9 w-9 cursor-pointer text-[20px] text-[#fff] flex-shrink-0 mr-2 rounded-full bg-[#6d4fc2] hover:bg-[#593bab] transition-all duration-200 ease-in-out "
            >keyboard_arrow_up</button>

        </form>
    );
}

export default ChatForm;