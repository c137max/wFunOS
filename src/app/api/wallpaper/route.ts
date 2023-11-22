'use server'
import { OK } from "../result"

export async function GET(request: Request) {
    const paper_list = [
        "hello"
    ]
    
    return OK(paper_list)
}