
interface DeskIconProps {
    children?: React.ReactNode,
    name?: string,
    key?: string | number
    onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function DeskIcon({ children, name, onDoubleClick = (e) => { } }: DeskIconProps) {
    return (
        <div>
            <button className="w-10 h-10 drop-shadow-lg backdrop-blur-lg  hover:cursor-pointer text-white  outline-white shadow-md
            align-middle text-center mr-2 select-none rounded-lg
            border
            " onDoubleClick={onDoubleClick}><div className="m-2"> 
                {children}
            </div>
            </button>
            <div className="text-white text-center text-sm font-extralight select-none">{name}</div>
        </div>
    );
}
