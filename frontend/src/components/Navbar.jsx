import { memo } from "react";
import ProfilePicture from "./ProfilePicture";

const Navbar = memo(() => {
    const username = localStorage.getItem("username") || "User"
    return (<div className="shadow-lg p-5 flex justify-between items-center">
        <div className="text-xl font-extrabold flex justify-between items-center">
            Payments App
        </div>
        <div className="flex gap-2 justify-between items-center">
            <div className="text-base font-medium">Hello<span>, {username}</span></div>
            <ProfilePicture text={username[0].toUpperCase()}/>
        </div>
    </div>)
})

export default Navbar;