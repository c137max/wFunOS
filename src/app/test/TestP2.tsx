import { getWorld } from "@/api/simple"
import { useState } from "react"

export default function TestP2() {
    const [text, setText] = useState("")
    

    const handleOnclick = () => {
        setText(getWorld())
    }

    return <>
        <p>{text}</p>
        <button className="btn-success" onClick={handleOnclick}>点击这里</button>
    </>
}