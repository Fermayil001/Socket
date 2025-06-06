import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import ChatUI from "../pages/Chat"

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/room/:room/:userName" element={<ChatUI />} />
        </Routes>
    )
}

export default AppRoute