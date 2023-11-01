import { MinusCircleIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react"


interface MyWindowProps {
    children?: React.ReactNode,
    initPos?: [number, number],
    title?: string,
    height?: number,
    width?: number,
    isActive?: boolean,
    onClick?: () => boolean | void;
}

export default function MyWindow({ children, isActive = true, initPos = [70, 80],
    width = 200, height = 300, title = '',
    onClick = () => true
}: MyWindowProps) {
    const windowRef = useRef(null);

    const moveBoxRef = useRef(null);

    const [pos, setPos] = useState({
        x: initPos[0],
        y: initPos[1],
        isDragging: false, // 新增一个isDragging状态用于标识是否正在拖动
        initialX: 0,
        initialY: 0,
    });


    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        e.preventDefault()
        setPos({
            ...pos,
            isDragging: true,
            initialX: e.clientX,
            initialY: e.clientY,
        });
    };
    const handleMouseLeave = () => {
        setPos({
            ...pos,
            isDragging: false,
        });
    }
    const handleMouseUp = (_e: React.MouseEvent) => {
        setPos({
            ...pos,
            isDragging: false,
        });
    };
    const handleMoveCapture = (e: React.MouseEvent) => {
        if (pos.isDragging) {
            const deltaX = e.clientX - pos.initialX;
            const deltaY = e.clientY - pos.initialY;
            setPos({
                ...pos,
                x: pos.x + deltaX,
                y: pos.y + deltaY,
                initialX: e.clientX,
                initialY: e.clientY,
            });
        }
    };
    useEffect(() => {
        const div = moveBoxRef.current;
        if (div) {
            // 在组件渲染完成后获取div元素，并设置其新的宽度和高度
            // @ts-ignore
            div.style.top = `${pos.y}px`;
            // @ts-ignore
            div.style.left = `${pos.x}px`;
        }
    }, [pos.x, pos.y]);
    const handleWindowClose = () => {
        console.log('close')
        if (!onClick()) {
            return;
        }
        if (windowRef.current !== null) {
            // @ts-ignore
            windowRef.current.remove()
        }
    }

    return (
        <div ref={windowRef}>
            <div>
                
            </div>
            <div
                style={{ top: `${initPos[0]}px`, left: `${initPos[1]}px`, height: `${height}px`, width: `${width}px` }}
                className="overflow-hidden overflow-x-auto  rounded   fixed   "
                ref={moveBoxRef}
            >
                <div className={`${isActive ? 'bg-base-100' : 'bg-base-200'} text-white bg-opacity-60 backdrop-blur-lg p-3 inline-flex w-full`}
                    onMouseMove={handleMoveCapture} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    <XCircleIcon className="h-5 text-black hover:text-red-600" onClick={handleWindowClose} />
                    <PlusCircleIcon className="h-5 text-yellow-500 hover:text-yellow-300 " />
                    <MinusCircleIcon className="h-5 text-green-500  hover:text-green-300" />
                    <p className="ml-3">{title}</p>
                </div>
                <div className="flex bg-opacity-60 backdrop-blur-lg px-1 py-1 bg-base-200 h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}


