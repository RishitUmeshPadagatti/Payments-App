import { memo } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePicture = memo(({ text, onClick }) => {
    const navigate = useNavigate()
    return (<div onDoubleClick={() => {
        localStorage.clear()
        navigate("/signin")
    }} className="bg-[#f4f4f5] w-[35px] h-[35px] rounded-full font-medium flex justify-center items-center cursor-pointer">{text}</div>)
})

export default ProfilePicture;