import React from "react";

interface DeskIconProps {
    children?: React.ReactNode,
    name?: string,
    key?: string | number
    onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function DeskIcon({ children, name, onDoubleClick = (e) => { } }: DeskIconProps) {
    return (
        <div >
            <button className="w-10 bg-slate-300 h-10  hover:cursor-pointer text-black transition-colors duration-150 hover:text-red-400  hover:bg-slate-200
            align-middle text-center rounded shadow-2xl shadow" onDoubleClick={onDoubleClick}><div className="m-2">
                {children}
            </div>
            </button>
            <div className="text-white text-center text-sm font-extralight select-none">{name}</div>
        </div>
    );
}
