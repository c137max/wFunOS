
export interface ResultMsg {
    message?: string,
    code?: number,
    data?: PageData | number | string | any 
}

export interface PageData {
    concurrentPage: number,
    total: number,
    limit: number,
    list: any[] 
}


export function OK(data: any = "", message: string = '成功' ) {
    return Res({
        code: 200,
        message,
        data
    })
}

export function Res(params: ResultMsg) {
    const {message, data, code} = params;
    return Response.json({
        code,
        message,
        data
    })
}