import { memo } from "react";

const InputBox = memo(({ label, placeholder, onChange }) => {
    return (<div className="flex flex-col my-[15px]">
        <label className="text-sm font-semibold mb-[5px]">{label}</label>
        <input onChange={onChange} className={`border border-gray-200 rounded px-3 py-2 outline-none ${label=="Username" ? null : "capitalize"}`} type="text" placeholder={placeholder} />
    </div>)
})

export default InputBox;