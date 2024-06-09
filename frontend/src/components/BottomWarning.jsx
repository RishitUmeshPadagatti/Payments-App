import { memo } from "react";
import { useNavigate } from "react-router-dom";

const BottomWarning = memo(({ text, toLabel, toAddress }) => {
    const navigate = useNavigate()

    return (<div className="my-[15px] text-center text-sm font-semibold">
        <span className="cursor-default">{text}</span> <span className="underline cursor-pointer" onClick={() => navigate(toAddress)}>{toLabel}</span>
    </div>)
})

export default BottomWarning;