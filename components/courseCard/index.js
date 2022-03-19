import Link from "next/link";
import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require('./index.less')

export default function CourseCard({data = {}}) {
    return (
        <div className="course-card column5">
            <div className="image">
                {data.is_hot === "1" ? <span className="tag">热门</span> : ""}
                <Link href={"/course/detail?id=" + data.id}>
                    <a>
                        <Image src={baseURL + data.fm_url}  layout={"fill"} objectFit={"cover"} alt=""/>
                        {/*<img src={baseURL + data.fm_url} alt=""/>*/}
                    </a>
                </Link>
            </div>
            <div className="title">
                <Link href={"/course/detail?id=" + data.id}>
                    <a>
                        {data.title}
                    </a>
                </Link>
            </div>
            <div className="score">
                <div className="star">
                    <div className="y_star" style={{width: `${data.comment_avg_score / 5 * 100}%`}}/>
                </div>
                <span className="score_text">{data.comment_avg_score}</span>
            </div>
            <div className="zan">
                <span className="good iconfont icon-icon_good">{data.comment_count}人好评</span>
            </div>
        </div>
    )
}