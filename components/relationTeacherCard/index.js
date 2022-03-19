import Image from "next/image";
require('./index.less')
import Link from "next/link";
import {baseURL} from "../../tool/Ajax";

export default function RelationTeacherCard({data}) {
    return (
        <div className="c-teacher ">
            <Link  href={"/teacher/detail?id="+data.teacher_id}>
                <a>
                    <div className="c-top">
                        {/*<img src={baseURL + data.header} alt=""/>*/}
                        <div className={"img"}>
                            <Image src={baseURL + data.header} layout={"fill"} objectFit={"cover"} alt=""/>
                        </div>
                    </div>
                    <div className="c-bottom">
                        {`${data.position}:  ${data.name}`}
                    </div>
                </a>
            </Link>

        </div>
    )
}