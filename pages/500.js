import {Button, Result} from "antd";
import {useRouter} from "next/router";


export default function ServerError(){
    const router = useRouter()
    return(
        <Result
            status="500"
            title="500"
            subTitle="对不起，页面出现一点点小错误，您可以点击下方按钮返回首页"
            extra={<Button type="primary" onClick={()=>{
                router.replace('/')
            }}>返回首页</Button>}
        />
    )
}