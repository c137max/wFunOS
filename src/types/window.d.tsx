

interface WindowType {
    id: string,
    title: string,
    icon?: string,
    zIndex: number,
    isActive: boolean,
    isHide: boolean,
    content: any,

    height?: number,
    weight?: number,
    posX: number,
    posY: number
}

interface DeskIconProps {
    id: string,
    label: string,
    icon: React.ReactElement | string,
    comp: any  // 内容
}