"use client"

import {sayHello} from "@/app/testForm/actions";
import {useState} from "react";

const TestFormPage = () => {
    const [data, setData] = useState({ cps: <div></div> });
    const onClicked = async () => {
        const data = await sayHello()
        console.log(data)
        setData(data)
    }

    return (
        <div className="relative h-full flex flex-col">
            <button className="btn" onClick={onClicked}>Button</button>
            { data.cps }
        </div>
    )
}

export default TestFormPage