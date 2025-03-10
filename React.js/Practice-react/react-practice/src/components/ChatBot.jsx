import ChatBotIcon from "./ChatBotIcon";
import ChatForm from "./ChatForm";
import ChatMassage from "./ChatMassage";
import { useEffect, useRef, useState } from "react";

import './style.css';

function ChatBot() {

    const [chatHistory, setChatHistory] = useState([]);

    const chatBotRef = useRef();

    const generateBotResponse = async (history) => {

        const updateHistory = (text) => {
            // Helper function to update chat history with bot's response
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
        };

        // Remove the "Thinking..." placeholder
        history = history.map(({role, text}) => ({role, parts: [{text}]}));

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: history})
        }

        try {
            // Make the API call to get bot's response
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error.message || "Something went wrong!");
            }

            console.log(data);

            // clean and update chat history with bot's response
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponseText);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        // Auto-scroll whenever chat history updates
        chatBotRef.current.scrollTo({top: chatBotRef.current.scrollHeight, behavior: "smooth"});
    }, [chatHistory]);

    return (
        <div className="container font-[poppins]">
            <div className="chatbot-popup relative w-[420px] overflow-hidden bg-[#fff] rounded-lg shadow-lg">
                {/* ChatBox header  */}
                <div className="chat-header flex px-6 py-4 items-center justify-between bg-[#6d4fc2]">
                    <div className="header-info flex gap-3 items-center">

                        <ChatBotIcon />
                        <h2 className="logo-text text-[#fff] font-bold text-[21px]">ChatBot</h2>

                    </div>
                    <button className="material-symbols-outlined h-10 w-10 border-none outline-none text-[#fff] cursor-pointer text-[28px] pt-1 rounded-full -mr-2 bg-none hover:bg-[#593bab] transition-all duration-200 ease-in-out ">keyboard_arrow_down</button>
                </div>

                {/* Chat body */}
                <div ref={chatBotRef} className="chat-body h-[460px] overflow-y-auto p-6 flex flex-col gap-5">
                    <div className="massage bot-massage flex gap-3 items-center ">
                        {/* <ChatBotIcon className="fill-[#fff] bg-[#6d4fc2]" /> */}
                        <svg className="h-9 w-9 p-2 fill-[#fff] bg-[#6d4fc2] rounded-full" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" /></svg>
                        
                        <p className="massage-text px-4 py-3 max-w-[75%] text-[15px] bg-[#f6f2ff] rounded-e-lg rounded-tl-lg rounded-bl-sm">
                            Heyy there 👋,<br /> How can i help you today?
                        </p>
                    </div>

                    {/* Render the chat history */}
                    {chatHistory.map((chat, index) => (
                        <ChatMassage key={index} chat={chat} />
                    ))}
                </div>

                {/* Chat footer */}
                <div className="chat-footer absolute bottom-0 w-[100%] pt-4 px-6 pb-5 ">
                    <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                </div>
            </div>
        </div>
    );
}

export default ChatBot;