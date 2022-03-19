import Link from "next/link";
import Image from "next/image";
import {baseURL} from "../../tool/Ajax";
require('./index.less')

export default function TeacherCard({data={}}) {
    return (
        <div className="teacher-card column3">
            <div className="left">
                <Link href={"/teacher/detail?id=" + data.id}>
                    <a>
                        {/*<img className="t-header" src={baseURL + data.header} alt=""/>*/}
                        <div className={"t-header"}>
                            <Image src={baseURL + data.header} layout={"fill"} objectFit={"cover"}  alt=""/>
                        </div>
                        <div className="t-name">{data.name}</div>
                    </a>
                </Link>
            </div>
            <div className="right">
                <div className="t-position">{data.position}</div>
                <div className="t-intro">
                    {data.intro}
                </div>
            </div>
        </div>
    )
}