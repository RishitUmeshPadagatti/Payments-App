import axios from "axios"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import Navbar from "../components/Navbar"
import ProfilePicture from "../components/ProfilePicture"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
    const [filter, setFilter] = useState("")
    const [balanceAmount, setBalanceAmount] = useState()
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(function (response) {
                setBalanceAmount(response.data.balance);
            })
            .catch(() => {
                navigate("/signin")
                return
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(function (response) {
                setUsers(response.data.users)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [filter])

    return <div className="w-[100vw] h-[100vh]">
        <Navbar />

        <div className="flex m-5 gap-2 text-lg font-extrabold">
            <div>Your Balance</div>
            <div>₹{balanceAmount}</div>
        </div>
        <div className="m-5 gap-4 flex flex-col">
            <div className="text-lg font-extrabold">
                Users
            </div>
            <div>
                <input onChange={(e) => {
                    setFilter(e.target.value);
                }} className="w-full border border-gray-200 rounded px-3 py-2 outline-none" placeholder="Search Users..." />
            </div>
            <div>
                {users.map((user) => {
                    return <User key={uuidv4()} user={user}/>
                })}
            </div>
        </div>
    </div>
}

const User = ({user}) => {
    const navigate = useNavigate()
    return <div className="flex justify-between my-[10px]">
        <div className="flex justify-center items-center gap-3">
            <div><ProfilePicture text={user.username[0].toUpperCase()} /></div>
            <div className="text-base font-bold">{user.firstname + " " + user.lastname}</div>
        </div>
        <div>
            <Button onClick={() => {
                navigate(`/send?id=${user._id}&firstname=${user.firstname}&lastname=${user.lastname}`)
            }} text="Send Money" />
        </div>
    </div>
}