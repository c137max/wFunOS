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
        isDragging: false, // 是否正在拖动
        initialX: 0,
        initialY: 0,
        isZooming: false,  // 是否正在缩放div
        width,
        height
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
            // @ts-ignore
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
            <div
                style={{ top: `${initPos[0]}px`, left: `${initPos[1]}px`, height: `${pos.height}px`, width: `${pos.width}px` }}
                className="overflow-hidden overflow-x-auto fixed cursor-auto resize ov"
                ref={moveBoxRef}
            >
                <div className={`absolute top-0 left-0 right-0 bottom-0 `}>
                    <div className={`${isActive ? 'bg-base-100' : 'bg-base-200'} text-white bg-opacity-60 select-none  h-12  backdrop-blur-lg p-3 inline-flex items-center w-full`}
                        onMouseMove={handleMoveCapture} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="space-x-1 inline-flex">
                            <div onClick={handleWindowClose} className="w-3 h-3 bg-black hover:bg-red-600 rounded-full"></div>
                            <div className="w-3 h-3  bg-yellow-500 hover:bg-yellow-300 rounded-full"></div>
                            <div className="w-3 h-3  bg-green-500 hover:bg-green-300 rounded-full"></div>
                        </div>
                        <p className="ml-4">{title}</p>
                    </div>
                    <div className=" absolute top-12 left-0 right-0 bottom-0  bg-opacity-60 backdrop-blur-lg px-1 py-1 bg-base-200 ">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    )
}
