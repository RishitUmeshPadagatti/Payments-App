import { useState } from "react";
import HeadingAndSubheading from "../components/HeadingAndSubheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signupBodySchema from "../schemas/signupBodySchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false)

    const notify = (message) => {
        toast(message)
    };
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const requestJson = {
            username: username,
            firstname: firstName,
            lastname: lastName,
            password: password
        }

        const parsingResult = signupBodySchema.safeParse(requestJson)
        if (!parsingResult.success){
            notify(parsingResult.error.errors[0].message)
            setIsSubmitting(false)
            return;
        }
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", requestJson)
            localStorage.setItem("token", `Bearer ${response.data.token}`)
            localStorage.setItem("username", username)
            setIsSubmitting(false)
            navigate("/dashboard")
        } catch (error){
            toast("Error")
            setIsSubmitting(false)
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <ToastContainer />
            <div className="rounded-lg shadow-lg w-[85vw] max-w-[320px] px-6 py-8">
                <HeadingAndSubheading heading="Sign Up" subheading="Enter your information to create an account"/>

                <InputBox onChange={(e) => { setFirstName(e.target.value) }} label="First Name" placeholder="John" />
                <InputBox onChange={(e) => { setLastName(e.target.value) }} label="Last Name" placeholder="Doe" />
                <InputBox onChange={(e) => { setUsername(e.target.value) }} label="Username" placeholder="johndoe" />

                <PasswordInput showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword}/>

                <Button onClick={() => {
                    if (!isSubmitting){
                        handleSubmit()
                    }
                }} text={isSubmitting ? 'Signing Up...' : 'Sign Up'}/>

                <BottomWarning text="Already have an account?" toLabel="Login" toAddress="/signin" />
            </div>
        </div>
    );
}
