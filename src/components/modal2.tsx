import HeroIcon from "./icon";
import { useState } from "react";


interface ModalProps {
    isOpen: boolean;
    children?: string | React.ReactNode;
    x?: number,
    y?: number,
    onClick?: Function
}

export interface MenuProps {
    icon: string,  // -> https://heroicons.com/
    className?: string,
    name: string,
    isOutline?: boolean,
    children?: MenuProps[],
}


const menu: MenuProps[] = [
    {
        icon: 'AcademicCapIcon', className: '', name: '学习', isOutline: true
    },
    {
        icon: 'Cog8ToothIcon', name: '切换壁纸', isOutline: false
    },
    {
        icon: 'ShareIcon', name: '分享', isOutline: true, children: [
            { icon: 'BugAntIcon', name: 'QQ' },
            { icon: 'BugAntIcon', name: '有BUG' },
        ]
    },
    {
        icon: 'EllipsisHorizontalCircleIcon', name: '@Soyie', isOutline: true
    }
];


export default function Modal2({
    isOpen,
    x = 0,
    y = 0,
    onClick = (index: string) => { }
}: ModalProps) {
    const [subMenu, setSubMenu] = useState({
        n: 0,
        display: false,
        sMenu: [],
    });
    const handlePannelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const handleLIClick = (n: number, hasChild: boolean, self: MenuProps, children?: MenuProps[]) => {
        onClick(n.toString());
    }
    const handleLIHover = (n: number, hasChild: boolean, self: MenuProps, children?: MenuProps[]) => {
        if (hasChild) {
            setSubMenu({
                n,
                display: true,
                // @ts-ignore
                sMenu: children
            })
        } else {
            setSubMenu({
                n: 0,
                display: false,
                // @ts-ignore
                sMenu: null
            })
        }
    }
    const handleLILeave = () => {
        setSubMenu({
            n: 0,
            display: false,
            // @ts-ignore
            sMenu: null
        })

    }

    const handleSubMenuClick = (index: string) => {
        onClick(index);
    }

    return (
        <div>
            {isOpen && (
                <div onClick={handlePannelClick} className='absolute inline-flex  rounded ' style={{ top: `${y}px`, left: `${x}px` }}
                    onMouseLeave={() => handleLILeave()}
                >
                    <ul className="menu bg-base-100 w-56 rounded-box overflow-auto">
                        {menu.map((m, i) => <li key={m.name + '-' + i}>
                            <div onClick={() => handleLIClick(i, m.children != undefined, m, m.children)}
                                onMouseEnter={() => handleLIHover(i, m.children != undefined, m, m.children)}
                            >
                                <HeroIcon name={m.icon} className={m?.className} outline={m?.isOutline} />
                                {m.name}
                                {m.children != undefined ?
                                    <HeroIcon name='ChevronRightIcon' className={m?.className} outline={true} />
                                    : null}
                            </div>
                        </li>)
                        }
                    </ul>
                    {subMenuComponent(subMenu, handleSubMenuClick)}
                </div>
            )}
        </div>
    );
}

interface SubMenuComponentProps {
    n: number,
    display: boolean,
    sMenu: MenuProps[]
}

const subMenuComponent = ({ n, display, sMenu }: SubMenuComponentProps, onclick = (i: string) => { }) => {
    return <div>
        {display ? <ul className={`menu bg-base-100 ml-2 w-56 rounded-box`} style={{ marginTop: 42 * n + 'px' }} >
            {sMenu.map((s, i) => <li key={n + "-" + i}>
                <div onClick={() => onclick(n + '-' + i.toString())}><HeroIcon name={s.icon} className={s?.className} outline={s?.isOutline} />{s.name}</div>
            </li>)}
        </ul> : null}
    </div>
}
