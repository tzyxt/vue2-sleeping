
import Mock from "mockjs";
Mock.mock("/api/usering", "post",(req) => {
    const {loginId, loginPwd} = JSON.parse(req.body)
    if(loginId==="admin" || loginPwd==="123123"){
        return {
            code: 0,
            data: {
                msg: 'mock测试成功'
            }
        }
    }
    }
);