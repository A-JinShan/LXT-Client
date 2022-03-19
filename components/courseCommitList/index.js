import {getFormalDate} from "../../tool/dateTool";
import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require("./index.less")

export default function CourseCommentList({data}) {
    return (
        <div className="comment-list">
            <div className="comment-title">
                评论
            </div>
            <div className="comment-items">
                {
                    data.map(item => {
                        return (
                            <div key={item.id} className="comment-item">
                                <div className="top">
                                    {/*<img className="user-header" src={ baseURL +item.header} alt=""/>*/}
                                    <div className={"user-header"}>
                                        <Image src={baseURL +item.header} layout={"fill"} objectFit={"cover"}  alt=""/>
                                    </div>
                                    <div className="message">
                                        <div className="message-top">
                                            <span className="user-name">{item.nick_name}</span>
                                            <div className="star">
                                                <div className="y_star" style={{width: `${item.score * 2 * 10}%`}}/>
                                            </div>
                                        </div>
                                        <div className="comment-time">
                                            {getFormalDate(item.create_time)}
                                        </div>
                                    </div>
                                </div>
                                <div className="content">
                                    {item.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
