


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

    public addWindow(item: DeskIconProps & { height?: number, weight?: number, x?: number, y?: number} ) {
        this.workQueue.push({
            title: item.label,
            id: ++this.workIdIndex + '-' + item.label,
            zIndex: ++this.maxZIndex,
            isActive: true,
            isHide: false,
            content: item.comp(),
            height: item.height ?? this.defaultH,
            weight: item.height ?? this.defaultW,
            posX: item.x ?? this.getAndAddX(),
            posY: item.x ?? this.getAndAddY(),
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

    public setActive(id: string) {

    }


    done() {
        this.setWindowCallBack([...this.workQueue]);
    }

}

export default WindowManage;