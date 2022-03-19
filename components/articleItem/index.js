import {getFormalDate} from "../../tool/dateTool";
import Link from "next/link";

require('./index.less')
export default function ArticleItem({data={}}){
    return(
        <div className="article-item">
            <div className="top">
                <Link href={"/article/detail/" + data.id}><a className="title">{data.title}</a></Link>
                <span className="time">{getFormalDate(data.create_time)}</span>
            </div>
            <div className="bottom">
                {data.intro}
            </div>
        </div>
    )
}

