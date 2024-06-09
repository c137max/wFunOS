'use client'

import {useState} from "react";
import Modal2 from "../components/modal2";
import Dock from "../components/dock";
import MyWindow from "../components/window";
import DeskIcon from "@/components/deskIcon";
import {BugAntIcon, ComputerDesktopIcon, MusicalNoteIcon} from "@heroicons/react/24/solid";
import {MusicPage, TestPage, TestPage2} from "../utils/dynamicImport";
import WindowManage from "./window-manage";

const bgImages = [
    "https://yijhsite-1251621866.cos.ap-guangzhou.myqcloud.com/IMG_20230211_182751.jpg",
    "https://yijhsite-1251621866.cos.ap-guangzhou.myqcloud.com/20230628001928.png",
    "https://yijhsite-1251621866.cos.ap-guangzhou.myqcloud.com/rafael-garcin-BemwT7_KYAM-unsplash.jpg"
]

const initWondows: WindowType[] = []

const windManage = new WindowManage();

const deskIcons: DeskIconProps[] = [
    {id: '1', label: '计算器', icon: <ComputerDesktopIcon/>, comp: TestPage},
    {id: '2', label: '测试', icon: <BugAntIcon/>, comp: TestPage2},
    {
        id: '3', label: '音乐', icon: <MusicalNoteIcon/>, comp: MusicPage, initSetting: {
            height: 400,
            weight: 600
        }
    },

]

export default function Home() {


    const [isOpen, setIsOpen] = useState(false);
    const [bgImageIndex, setBgImageIndex] = useState(0);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [windows, setWindows] = useState(initWondows);

    // @ts-ignore
    windManage.setWindowCall(setWindows);


    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        setIsOpen((_) => false)
        setPosition({x: e.pageX, y: e.pageY})
        setIsOpen((_) => true)
    }

    const handleContextClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsOpen((_) => false)
        }
    }

    const handleMenuOnClick = (index: string) => {
        if (index === '1') {
            if (bgImageIndex >= bgImages.length - 1) {
                console.log(`切换壁纸: ${bgImages[0]}`)
                setBgImageIndex(0);
            } else {
                console.log(`切换壁纸: ${bgImages[bgImageIndex + 1]}`)
                setBgImageIndex(bgImageIndex + 1);
            }
            // setIsOpen((_) => false)
        }
    }

    const handleWindowClick = (id: string) => {
        windManage.setActive(id)
        windManage.done()
    }

    const handleDockWorkClick = (id: string) => {
        windManage.setActive(id);
        windManage.setVisiableRevers(id);
        windManage.done()
    }

    const handleWindowClose = (id: string) => {
        windManage.removeWindow(id)
        windManage.done()
    }

    const handleWindowMinmize = (id: string) => {
        windManage.setDisactive(id);
        windManage.setVisiable(id, false);
        windManage.done()
    }


    const handlIconDoubleClick = (item: DeskIconProps) => {
        windManage.setAllWDisActive();
        windManage.addWindow(item)
        windManage.done();
    }

    return (
        <div style={{backgroundImage: ` url('${bgImages[bgImageIndex]}')`}} onClick={handleContextClicked}
             onContextMenuCapture={e => e.preventDefault()}
             className={`bg-cover bg-center min-h-screen p-3 rounded-lg bg-blue-50 `}>
            <div className="h-10 bg-base-100 rounded-full backdrop-blur-lg bg-opacity-60  top-0 w-full "/>
            <Modal2 isOpen={isOpen} x={position.x} y={position.y} onClick={handleMenuOnClick}></Modal2>
            <Dock windows={windows} className="fixed z-0 bottom-3 w-3/4" onClick={handleDockWorkClick}></Dock>
            <main className="mt-5 mb-5">
                <div onClick={handleContextClicked} onContextMenuCapture={handleContextMenu}
                     className="grid grid-rows-6 grid-flow-col gap-4 justify-start">
                    {deskIcons.map((m) =>
                        <DeskIcon key={m.id} onDoubleClick={() => handlIconDoubleClick(m)} name={m.label}>
                            {m.icon}
                        </DeskIcon>
                    )}
                </div>
            </main>
            <>
                {windows.map(m => <MyWindow key={m.id} title={m.title} zIndex={m.zIndex} isActive={m.isActive}
                                            isHide={m.isHide} height={m.height} width={m.weight}
                                            initPos={[m.posX, m.posY]}
                                            onClick={() => handleWindowClick(m.id)}
                                            onClose={() => handleWindowClose(m.id)}
                                            onMinimize={() => handleWindowMinmize(m.id)}
                >
                    {m.content}
                </MyWindow>)}
            </>
        </div>
    )
}