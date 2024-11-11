import  request from './request';

export async function getHongshui(page=1, limit=10){
 return await request.get('/api/hongshui', {
    params: {
      page,
      limit,
    }
 })
}