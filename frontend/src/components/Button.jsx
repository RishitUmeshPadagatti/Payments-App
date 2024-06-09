import { memo } from "react";

const Button = memo(({ text, onClick }) => {
    return (<button onClick={onClick} className="bg-black text-white w-full rounded px-3 py-2 outline-none">{text}</button>)
})

export default Button;