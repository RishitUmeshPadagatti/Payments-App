import { useState } from "react";
import HeadingAndSubheading from "../components/HeadingAndSubheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signinBodySchema from "../schemas/signinBodySchema";

export default function Signin() {
    const [username, setUsername] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false)

    const notify = (message) => {
        toast(message)
    };
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setIsSubmitting(true)
        
        const requestJson = {
            username: username,
            password: password
        }

        const parsingResult = signinBodySchema.safeParse(requestJson)
        if (!parsingResult.success){
            notify(parsingResult.error.errors[0].message)
            setIsSubmitting(false)
            return
        }

        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", requestJson)
            localStorage.setItem("token", `Bearer ${response.data.token}`)
            localStorage.setItem("username", username)
            setIsSubmitting(true)
            navigate("/dashboard")
        } catch (error){
            toast("Invalid Credentials")
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <ToastContainer />
            <div className="rounded-lg shadow-lg w-[85vw] max-w-[320px] px-6 py-8">
                <HeadingAndSubheading heading="Sign In" subheading="Enter your credentials to access your account"/>

                <InputBox onChange={(e) => { setUsername(e.target.value) }} label="Username" placeholder="johndoe" />

                <PasswordInput showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword}/>

                <Button onClick={() => {
                    if (!isSubmitting){
                        handleSubmit()
                    }
                }} text={isSubmitting ? 'Signing In...' : 'Sign In'}/>

                <BottomWarning text="Don't have an account?" toLabel="Sign Up" toAddress="/signup" />
            </div>
        </div>
    );
}