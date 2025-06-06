import React, { useEffect, useState, type FormEvent } from "react";
import BgPhoto from '../assets/images/chatBg.avif'
import { useSocketStore } from "../zustand/Store";
import { useParams } from "react-router-dom";
import DefaultAvatar from '../assets/images/avatardefault_92824.webp'

const ChatUI: React.FC = () => {
    const socket = useSocketStore(state => state.socket)

    const params = useParams()
    const room = params.room!;
    const userName = params.userName!;

    const [message, setMessage] = useState<string>("");
    const [allMessages, setAllMessages] = useState<
        { message: string; userName: string; room: string }[]
    >([]);

    useEffect(() => {
        socket.on('receive_message', (data: { message: string; userName: string; room: string }) => {
            setAllMessages(prev => [...prev, data])
        })
    }, [socket])

    const handleSend = (e: FormEvent) => {
        e.preventDefault();

        const messageContent = {
            message,
            userName,
            room,
        }

        socket.emit("message", messageContent)
        setAllMessages(prev => [...prev, messageContent])
        setMessage("");
    };

    return (
        <div
            style={{ backgroundImage: `url(${BgPhoto})` }}
            className="w-full h-screen bg-center bg-cover pt-[5%]"
        >
            <div className="w-[90%] max-w-md mx-auto rounded-lg shadow-2xl flex flex-col h-[500px] ">
                <div className="flex-1 p-4 overflow-y-auto backdrop-blur-xs">
                    {allMessages.map((message, key) => (
                        <div
                            key={key}
                            className={`mb-3 flex ${message.userName === userName ? "justify-end" : "justify-start"
                                } `}
                        >
                            {
                                message.userName !== userName && (
                                    <div className="flex flex-col">
                                        <img
                                            className="w-10 h-10"
                                            src={DefaultAvatar}
                                            alt=""
                                        />
                                    </div>
                                )
                            }
                            <div
                                className={`inline-block px-4 py-2 rounded-lg max-w-[70%] whitespace-pre-wrap ${message.userName === userName
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-gray-300 text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                {message.userName !== userName && <div className=" text-sm font-semibold text-left">{message.userName}:</div>}
                                {message.message}
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={handleSend}
                    className="flex p-3 backdrop-blur-3xl"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Mesaj yazın..."
                        className="flex-1 text-white placeholder:text-white outline-none rounded-l-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold px-4 rounded-r-md transition"
                    >
                        Göndər
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ChatUI;
