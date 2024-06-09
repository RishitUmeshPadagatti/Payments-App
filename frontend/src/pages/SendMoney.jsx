import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePicture from '../components/ProfilePicture';
import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function SendMoney() {
    const [searchParams] = useSearchParams()

    const toId =  searchParams.get('id')
    const firstname =  searchParams.get('firstname')
    const lastname =  searchParams.get('lastname')

    const inputRef = useRef()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const notify = (message) => {
        toast(message)
    };

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        await axios.post("http://localhost:3000/api/v1/account/transfer", {
            amount: inputRef.current.value,
            to: toId
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then (function (response){
            notify("Successful")
            navigate("/dashboard")
        })
        .catch (() => {
            notify("Insufficient Balance or Server Error")
            setIsSubmitting(false);
        })
    };

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <ToastContainer />
            <div className="rounded-lg shadow-lg w-[85vw] max-w-[320px] px-6 py-8 flex flex-col gap-7">
                <div className='text-center'>
                    <h1 className="text-3xl font-bold cursor-default">Send Money</h1>
                </div>
                <div>
                    <div className='flex gap-3'>
                        <div><ProfilePicture text={firstname[0].toUpperCase()} /></div>
                        <div className='text-base font-bold flex items-center'>{firstname + " " + lastname}</div>
                    </div>
                    <div className='text-sm font-semibold my-[5px]'>
                        Amount (in Rs)
                    </div>
                    <div>
                        <input ref={inputRef} className='border border-gray-200 rounded px-3 py-2 outline-none w-full' type="number" placeholder='Enter amount' />
                    </div>
                </div>
                <div>
                    <GreenButton onClick={() => {
                        if (!isSubmitting) {
                            handleSubmit()
                        }
                    }} text={isSubmitting ? "Processing..." : "Initiate Transfer"} />
                </div>
            </div>
        </div>
    )
}

const GreenButton = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="bg-[#22c55d] text-white w-full rounded px-3 py-2 outline-none font-semibold text-sm">{text}</button>
    )
}