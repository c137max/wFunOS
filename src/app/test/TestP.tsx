import { useState } from "react"
import Modal from "../../components/modal"


export default function TestP() {
    const [isOpen, setIsOpen] = useState(false)

    const handleCloseModel = () => {
        setIsOpen(false)
    }
    return <>
        <div>
            <button className="bg-cyan-400 mx-3 my-2 rounded-md p-1 shadow-sm active:bg-cyan-300 text-white hover:bg-cyan-600" onClick={() => setIsOpen(true)}>
                点击就送
            </button>
            <Modal isOpen={isOpen} isCancelByMask={true} title="测试" onClose={handleCloseModel}>
                <div className="m-3">
                    我相信
                </div>
                <div className="mt-4">
                    <button
                        type="button"
                        className={`mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 `}
                    >
                        确定
                    </button>
                    <button
                        type="button"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 `}
                        onClick={handleCloseModel}
                    >
                        取消
                    </button>
                </div>
            </Modal>
        </div>
    </>
}