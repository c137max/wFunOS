import { useState } from "react";

interface DeskIconProps {
    children?: React.ReactNode,
    name?: string
    onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function DeskIcon({ children, name, onDoubleClick = () => { } }: DeskIconProps) {
    // const [clicked, setClicked] = useState();

    // const handleClick = () => {

    // }

    return (
        <>
            <div>
                <button className="w-20 h-20 drop-shadow-lg backdrop-blur-lg  hover:shadow-2xl hover:cursor-pointer text-white  outline-white shadow-md
               align-middle text-center mr-2  rounded-lg
               border
               " onDoubleClick={onDoubleClick}>{children}
                </button>
                <div className="text-white text-center text-sm font-extralight">{name}</div>
            </div>
        </>
    );
}
