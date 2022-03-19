import {Button, Result} from "antd";
import {useRouter} from "next/router";


export default function NotFount(){
    const router = useRouter()
    return(
        <Result
            status="404"
            title="404"
            subTitle="访问的页面不存在，您可以点击下方的按钮返回首页"
            extra={<Button type="primary" onClick={()=>{
                router.replace('/')
            }}>返回首页</Button>}
        />
    )
}