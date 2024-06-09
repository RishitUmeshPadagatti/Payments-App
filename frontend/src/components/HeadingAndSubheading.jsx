import { memo } from "react";

const HeadingAndSubheading = memo(({ heading, subheading }) => {
    return (<div className="text-center my-[20px] flex flex-col gap-2">
        <h1 className="text-3xl font-bold cursor-default">{heading}</h1>
        <h5 className="text-[12px] text-gray-500 cursor-default">{subheading}</h5>
    </div>)
})

export default HeadingAndSubheading;