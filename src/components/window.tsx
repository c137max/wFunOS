import { MinusCircleIcon, MinusIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react"


interface MyWindowProps {
    children?: React.ReactNode,
    isActive?: boolean
}

export default function MyWindow({ children, isActive = false }: MyWindowProps) {

    const [pos, setPos] = useState({
        x: 70,
        y: 80,
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
    return (
        <>
            <div
                style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
                className="overflow-hidden overflow-x-auto  rounded border  fixed min-h-[20] w-60 "
            >
                <div className="bg-base-100 bg-opacity-60 backdrop-blur-lg p-3 inline-flex w-full"
                    onMouseMoveCapture={handleMoveCapture} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                >
                    <XCircleIcon className="h-5 hover:text-red-600" />
                    <PlusCircleIcon className="h-5 text-yellow-500 hover:text-yellow-300 " />
                    <MinusCircleIcon className="h-5 text-green-500 hover:text-green-300" />

                </div>
                <div className="flex justify-center bg-opacity-60 backdrop-blur-lg px-4 py-16 bg-base-200">{children}</div>
            </div>
        </>
    )
}