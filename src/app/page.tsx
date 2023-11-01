'use client'

import { useState } from "react";
import Modal2 from "../components/modal2";
import Dock from "../components/dock";
import MyWindow from "../components/window";
import DeskIcon from "@/components/deskIcon";

const bgImages = [
  "images/0b3912f8f3514b6fb77779d258179e08.jpg",
  "images/3kqv3y.jpg",
  "images/4v833n.jpg",
  "images/18e06ad1d978769c670bfc1cc1be062b.png",
  "images/wallhaven-eymzjk.jpg"
]

// const initWondows = [
//   // {title: '公告', content: }
// ]

export default function Home() {

  let tmp = []
  for (let index = 0; index < 2; index++) {
    tmp.push(index.toString())
  }

  const [isOpen, setIsOpen] = useState(false);
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [windows, setWindows] = useState(initWondows);
  const deskIcon = tmp;

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
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
      // setIsOpen((_) => false)
    }
  }

  // const handleIconDoubleClick = () => {

  // }

  return (
    <div style={{ backgroundImage: ` url('${bgImages[bgImageIndex]}')` }} onClick={handleContextClicked} onContextMenuCapture={e => e.preventDefault()} className={`bg-cover bg-center min-h-screen p-3 rounded-lg bg-blue-50 `}>
      <div className="h-10 bg-base-100 rounded-full backdrop-blur-lg bg-opacity-60  top-0 w-full ">
      </div>
      <main className="mt-5 mb-5" >
        <div onClick={handleContextClicked} onContextMenuCapture={handleContextMenu} className="grid grid-rows-6 grid-flow-col gap-4 justify-start">
          {deskIcon.map((m) =>
            <DeskIcon key={m} name={m}>
              {m}
            </DeskIcon>
          )}
        </div>
      </main>
      {/* <>
        {windows.map(m => <>

        </>)}
      </> */}
      <MyWindow title="公告" width={470}>
        <div className="">
          <div>
            网站正在积极开发，点击鼠标右键可更换壁纸(壁纸来源网络，侵删)~
          </div>
          <div>
          </div>
          <div>
            接下来的工作:
          </div>
          <ul >
            <li>1.添加菜单功能</li>
            <li>2.完善dock显示</li>
            <li>3.窗口可伸缩</li>
          </ul>
        </div>
      </MyWindow>
      <MyWindow title="测试" width={306}>

      </MyWindow>
      <Dock windows={[]} className="fixed bottom-3 w-3/4"></Dock>
      <Modal2 isOpen={isOpen} x={position.x} y={position.y} onClick={handleMenuOnClick}></Modal2>
    </div>
  )
}