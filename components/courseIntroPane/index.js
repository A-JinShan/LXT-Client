import Link from "next/link";
import Image from "next/image";
import {baseURL} from "../../tool/Ajax";
require('./index.less')

export default  function CourseIntroPane({data}){
    return(
        <div className="course-intro-pane">
            <div className="left">
                <div className={"course-fm"}>
                    <Image src={baseURL + data.fm_url} alt="" layout={"fill"} objectFit={"cover"}/>
                </div>
                {/*<img src={baseURL + data.fm_url} alt="" className="course-fm" />*/}
            </div>
            <div className="right">
                <h3 className="course-title">{data.title}</h3>
                <p className="comment-message">评分: {data.course_avg_score} 分&emsp;&emsp;评价人数: {data.comment_count} 人</p>
                <p className="teacher-name">{`${data.position}:  ${data.name}`}</p>
                <Link href={"/course/play?id=" + data.id}><a className="get-course" >立即学习</a></Link>
            </div>
        </div>
    )
}