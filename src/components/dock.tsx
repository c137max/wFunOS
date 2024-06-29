import { ReactElement } from "react"
import {WindowType} from '@/types/window.d'


interface DockProps {
    className?: string,
    windows: WindowType[],
    onClick: (_id: string) => void
}

const renderIcon = (icon: string | undefined | ReactElement, title: string) => {
    if (icon === '' || icon == undefined) {
        return < div className=" text-black border w-12 h-12 rounded-full flex items-center justify-center text-lg font-light" >
            {title.slice(0, 1)}
        </div >
    } else {
        return <div title={title} className="w-7 h-7 rounded-full flex items-center justify-center">
            {icon}
        </div>
    }
}

export default function Dock({ className, windows, onClick }: DockProps) {
    return (
        <div className={className} >
            <div className="navbar bg-base-100 rounded-r-full backdrop-blur-lg bg-opacity-60" >
                <div className="dropdown dropdown-top">
                    <button className="btn btn-ghost btn-circle normal-case text-xl">M</button>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-80 h-96 bg-base-100 shadow">
                        This is a menu
                    </div>
                </div>
                <div className="dropdown dropdown-top">
                    {
                        windows.map(x =>
                            <div key={x.id} className={`btn ${x.isActive? 'bg-white bg-opacity-50' : ''} btn-ghost btn-circle normal-case text-xl`}>
                                <button onClick={()=> {onClick(x.id)}}>{ renderIcon(x.icon, x.title) }
                                </button>
                            </div>)
                    }

                </div>
                <div className="flex-1">

                </div>

                <div className="flex-none">
                    <div className="dropdown dropdown-top">
                    </div>
                    <div className="dropdown dropdown-top">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ">
                                <img src="/images/FhWGBtYacAISRtA.jpg" className="hover:rotate-180 duration-700 transform origin-center" />
                            </div>
                        </label>
                        <div className="menu menu-sm dropdown-content mt-3 z-[1] h-20 p-2 shadow bg-base-100 rounded-box w-52">
                            你好
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )
}