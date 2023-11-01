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
            // div.style.height = `${pos.height}px`;
            // // @ts-ignore
            // div.style.width = `${pos.width}px`;
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

    const handleZoomStart = () => {
        setPos({
            ...pos,
            isZooming: true
        })
    }
    const handleZoomDone = () => {

        if (pos.isZooming) {
            setPos({
                ...pos,
                isZooming: false
            })
        }
    }
    const handleZooming = (e: React.MouseEvent, locality: string) => {
        e.preventDefault();
        if (!pos.isZooming) {
            return;
        }
        if (locality === 'n') {  // n 表示北面
            setPos({
                ...pos,
                height: pos.height - e.movementY,
                y: pos.y + e.movementY
            })
        } else if (locality === 's') {  // s 表示南面
            setPos({
                ...pos,
                height: pos.height + e.movementY
            })
        } else if (locality === 'e') {  // e 表示东面
            setPos({
                ...pos,
                width: pos.width + e.movementX
            })
        } else if (locality === 'w') {  // w 表示西面
            setPos({
                ...pos,
                width: pos.width - e.movementX,
                x: pos.x + e.movementX
            })
        } else if (locality === 'ne') {  // ne 表示东北角
            setPos({
                ...pos,
                height: pos.height - e.movementY,
                y: pos.y + e.movementY,
                width: pos.width + e.movementX
            })
        } else if (locality === 'nw') {  // nw 表示西北角
            setPos({
                ...pos,
                height: pos.height - e.movementY,
                y: pos.y + e.movementY,
                width: pos.width - e.movementX,
                x: pos.x + e.movementX
            })
        } else if (locality === 'se') {  // se 表示东南角
            setPos({
                ...pos,
                height: pos.height + e.movementY,
                width: pos.width + e.movementX
            })
        } else if (locality === 'sw') {  // sw 表示西南角
            setPos({
                ...pos,
                height: pos.height + e.movementY,
                width: pos.width - e.movementX,
                x: pos.x + e.movementX
            })
        }
    }
    const SIZE = 2;
    return (
        <div ref={windowRef}>
            <div
                style={{ top: `${initPos[0]}px`, left: `${initPos[1]}px`, height: `${pos.height}px`, width: `${pos.width}px` }}
                className="overflow-hidden overflow-x-auto fixed "
                ref={moveBoxRef}
            >
                <div className="absolute z-0 top-0 left-0 right-0 bottom-0" onMouseDown={handleZoomStart} onMouseUp={handleZoomDone} onMouseLeave={handleZoomDone} >
                    <div id="w-n" onMouseMove={e => handleZooming(e, 'n')} className={`top-0 right-${SIZE} left-${SIZE} h-${SIZE} absolute cursor-ns-resize`}></div>
                    <div id="w-s" onMouseMove={e => handleZooming(e, 's')} className={`bottom-0 right-${SIZE} left-${SIZE} h-${SIZE} absolute cursor-ns-resize`}></div>
                    <div id="w-e" onMouseMove={e => handleZooming(e, 'e')} className={`bottom-${SIZE} top-${SIZE} right-0 w-${SIZE} absolute cursor-ew-resize`}></div>
                    <div id="w-w" onMouseMove={e => handleZooming(e, 'w')} className={`bottom-${SIZE} top-${SIZE} left-0 w-${SIZE} absolute cursor-ew-resize`}></div>

                    <div id="w-ne" onMouseMove={e => handleZooming(e, 'ne')} className={`top-0 right-0 w-${SIZE} h-${SIZE} absolute cursor-ne-resize`}></div>
                    <div id="w-nw" onMouseMove={e => handleZooming(e, 'nw')} className={`top-0 left-0 w-${SIZE} h-${SIZE} absolute cursor-nw-resize`} />
                    <div id="w-se" onMouseMove={e => handleZooming(e, 'se')} className={`bottom-0 h-${SIZE} right-0 w-${SIZE} absolute cursor-se-resize`}></div>
                    <div id="w-sw" onMouseMove={e => handleZooming(e, 'sw')} className={`bottom-0 h-${SIZE} left-0 w-${SIZE} absolute cursor-sw-resize`}></div>
                </div>
                <div className={`absolute top-2 left-2 right-2 bottom-2 `}>
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
