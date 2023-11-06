
interface DeskIconProps {
    children?: React.ReactNode,
    name?: string,
    key?: string | number
    onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function DeskIcon({ children, name, onDoubleClick = (e) => { } }: DeskIconProps) {
    return (
        <div>
            <button className="w-12 h-12 drop-shadow-lg backdrop-blur-lg  hover:cursor-pointer text-white  outline-white shadow-md
            align-middle text-center mr-2 select-none rounded-lg
            border
            " onDoubleClick={onDoubleClick}>{children}
            </button>
            <div className="text-white text-center text-sm font-extralight select-none">{name}</div>
        </div>
    );
}
