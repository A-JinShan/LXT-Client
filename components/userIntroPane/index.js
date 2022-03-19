import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require('./index.less')
export default function UserIntroPane({data = {}}) {
    return (
        <div className="user-info-pane">
            {/*<img className="user-header" src={baseURL + data.header} alt=""/>*/}
            {
                !data.header ? "" :
                <div className={"user-header"}>
                    <Image src={baseURL + data.header} layout={"fill"} objectFit={"cover"} alt="" />
                </div>
            }
            <span className="user-nickname">{data.nick_name}</span>
            <span className="zym">{data.intro}</span>
        </div>
    )
}