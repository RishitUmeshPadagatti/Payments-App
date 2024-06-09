import { memo } from "react";
import eyeOpen from "../assets/eyeOpen.svg"
import eyeClose from "../assets/eyeClose.svg"

const PasswordInput = memo(({ showPassword, setShowPassword, password, setPassword }) => {
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (<div className="flex flex-col my-[15px]">
        <label className="text-sm font-semibold mb-[5px]">Password</label>
        <div className="border border-gray-200 rounded px-3 py-2 flex justify-between">
            <input 
                onChange={(e) => { setPassword(e.target.value); }} 
                className="w-full outline-none" 
                type={showPassword ? "text" : "password"} 
                value={password}
            />
            <img 
                src={showPassword ? eyeOpen : eyeClose} 
                onClick={togglePasswordVisibility} 
                className="w-[20px] cursor-pointer" 
            />
        </div>
    </div>)
})

export default PasswordInput;