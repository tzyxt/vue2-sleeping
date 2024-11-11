import  request from './request';

export async function getHome(){
    return await request.get('/api/home' );
}