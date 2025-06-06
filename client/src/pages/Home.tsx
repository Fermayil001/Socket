import { useState } from "react"
import CustomInput from "../components/custom/CustomInput"
import { useNavigate } from "react-router-dom"
// import io from 'socket.io-client'
import { useSocketStore } from "../zustand/Store"

// const socket = io('http://localhost:8080')

const Home = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState<string>('')
    const [room, setRoom] = useState<string>('')

    const socket = useSocketStore(state => state.socket)

    console.log(socket)
    const handleStartMessaging = () => {
        if (userName && room) {
            socket.emit('join_room', room)
            navigate(`/chat/room/${room}/${userName}`)
        }
    }


    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-100 backdrop-blur-sm">
            <div className="w-1/3 flex flex-col justify-center items-center p-6 bg-white/70 backdrop-blur-md shadow-xl rounded-xl border space-y-4 border-blue-200">
                <h1 className="text-center text-3xl mb-10 font-semibold">Start mesajlasma</h1>
                <CustomInput placeholder="User name" value={userName} onChange={e => setUserName(e.target.value)} />
                <CustomInput placeholder="Room" value={room} onChange={e => setRoom(e.target.value)} />
                <button
                    onClick={handleStartMessaging}
                    className="mt-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Home