'use client'

import { useState } from "react";
import Modal2 from "./componets/modal2";
import Dock from "./componets/dock";
import MyWindow from "./componets/window";

const bgImages = [
  "images/0b3912f8f3514b6fb77779d258179e08.jpg",
  "images/3kqv3y.jpg",
  "images/4v833n.jpg",
  "images/18e06ad1d978769c670bfc1cc1be062b.png",
  "images/wallhaven-eymzjk.jpg"
]

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen((_) => false)
    setPosition({ x: e.pageX, y: e.pageY })
    setIsOpen((_) => true)
  }

  const handleContextClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen((_) => false)
    }
  }

  const handleMenuOnClick = (index: string) => {
    console.log(index)
    if (index === '1') {
      if (bgImageIndex >= bgImages.length - 1) {
        console.log(`切换壁纸: ${bgImages[0]}`)
        setBgImageIndex(0);
      }
      else {
        console.log(`切换壁纸: ${bgImages[bgImageIndex + 1]}`)
        setBgImageIndex(bgImageIndex + 1);
      }
    }
    setIsOpen((_) => false)
  }

  return (
    <div style={{ backgroundImage: ` url('${bgImages[bgImageIndex]}')` }} onContextMenuCapture={handleContextMenu} onClick={handleContextClicked} className={`bg-cover bg-center min-h-screen p-3 rounded-lg bg-blue-50 `}>
      <div className="navbar bg-base-100 rounded-full backdrop-blur-lg bg-opacity-60  top-0 w-full ">
        网站正在积极开发中，点击鼠标右键可更换壁纸~
      </div>
      <main >
        {/* content */}
      </main>
      <MyWindow>
        窗口移动性能不佳
      </MyWindow>
      <Dock className="fixed bottom-3 w-3/4"></Dock>
      <Modal2 isOpen={isOpen} x={position.x} y={position.y} onClick={handleMenuOnClick}></Modal2>
    </div>
  )
}