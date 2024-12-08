import request from "./request"

export async function getVideo(){
    return await request.get('/api/video');
}


