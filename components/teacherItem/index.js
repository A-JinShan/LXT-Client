import Image from "next/image";
import Link from "next/link";
import {baseURL} from "../../tool/Ajax";

require('./index.less')
export default function TeacherItem({data}){
    return(
        <div className="teacher-item">
            <div className="intro">
                <div className="message">
                    {/*<img className="t-header" src={baseURL+data.header} alt="" />*/}
                    <div className={"t-header"}>
                        <Image src={baseURL + data.header} layout={"fill"} objectFit={"cover"}  alt=""/>
                    </div>
                        <div className="t-profile">
                            <p className={`position-name ${data.is_star === 1 ? "is-star" : ""}`}>
                                {`${data.position}: ${data.name}`}
                            </p>
                            <p className="class-count">课程: {data.course_count} 门</p>
                        </div>
                </div>
                <Link href={"/teacher/detail?id="+data.id}><a className="to-detail" >进入主页</a></Link>
            </div>
            <div className="desc">
                <p>{data.intro}</p>
            </div>
        </div>
    )
}