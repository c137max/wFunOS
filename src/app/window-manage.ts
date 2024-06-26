import {DeskIconProps, WindowType} from "@/types/window.d";


class WindowManage {
    private workQueue: WindowType[];
    private workIdIndex: number;
    private setWindowCallBack: (item: any) => void = () => {};
    private maxZIndex: number;
    private xRecord: number;
    private yRecord: number;
    private defaultH: number = 300; // 默认高度
    private defaultW: number = 400; // 默认宽度

    constructor() {
        this.workQueue = []
        this.workIdIndex = 0;
        this.maxZIndex = 0;
        this.xRecord = 100;
        this.yRecord = 100;
    }

    public setWindowCall(setWindow: (item: any) => {}) {
        this.setWindowCallBack = setWindow;
    }

    public addWindow(item: DeskIconProps) {
        this.workQueue.push({
            title: item.label,
            id: ++this.workIdIndex + '-' + item.label,
            zIndex: ++this.maxZIndex,
            isActive: true,
            isHide: false,
            content: item.comp(),
            height: item.initSetting?.height ?? this.defaultH,
            weight: item.initSetting?.weight ?? this.defaultW,
            posX: item.initSetting?.posX ?? this.getAndAddX(),
            posY: item.initSetting?.posY ?? this.getAndAddY(),
            icon: item.icon
        })
    }

    public count(): number {
        return this.workQueue.length;
    }

    public removeWindow(id: string) {
        this.workQueue = this.workQueue.filter(i => id !== i.id);
    }


    private getAndAddX() {
        const t = this.xRecord
        this.xRecord += 20
        return t
    }

    private getAndAddY() {
        const t = this.yRecord
        this.yRecord += 20
        return t
    }

    /**
     * set all window disactive
     */
    public setAllWDisActive() {
        this.workQueue.forEach(i => {
            i.isActive = false
        })
    }

    public setDisactive(id: string) {
        this.workQueue.forEach(i => {
            if (i.id === id) {
                i.isActive = false
            } 
        })
    }

    public setActive(id: string) {
        this.workQueue.forEach(i => {
            if (i.id != id) {
                i.isActive = false
            } else {
                i.isActive = true;
                i.zIndex = ++this.maxZIndex ;
            }
        })
    }

    public isActive(id: string) {
        for (const i of this.workQueue) {
            if (i.id === id) {
                return i.isActive;
            }
        }
        throw new Error("ID 不存在");
    }

    public setVisible(id: string, visible: boolean) {
        this.workQueue.forEach(i => {
            if (i.id === id) {
                i.isHide = !visible
            } 
        })
    }

    public setVisibleRevers(id: string) {
        this.workQueue.forEach(i => {
            if (i.id === id) {
                i.isHide = !i.isHide
            } 
        })
    }

    public setActiveRevers(id: string) {
        this.workQueue.forEach(i => {
            if (i.id === id) {
                i.isActive = !i.isActive
            }
        })
    }


    done() {
        this.setWindowCallBack([...this.workQueue]);
    }

}

export default WindowManage;