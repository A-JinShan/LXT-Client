import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require('./index.less')
export default function TeacherIntroCard({data}) {
    return (
        <div className="teacher-intro">
            <div className="content bx">
                {/*<img className="t-header" src={baseURL + data.header} alt=""/>*/}
                <div className={"t-header"}>
                    <Image src={baseURL + data.header} layout={"fill"} objectFit={"cover"}  alt=""/>
                </div>
                <div className="intro-pane">
                    <p className={`t-position-name ${data.is_star === 1 ? "is-star" : ""}`}>{`${data.position}: ${data.name}`}</p>
                    <p className="desc">{data.intro}</p>
                </div>
            </div>
        </div>
    )
}