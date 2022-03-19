require('./index.less')
export default function CourseCommitPane(){
    return (
        <div className="comment-pane">
            <div className="comment-title">
                评论
            </div>
            <div className="form-pane">
                <div className="comment-score">
                    <span>给该课打分:</span>
                    <div className="star">
                        <div className="y_star" style={{width: "100%"}}/>
                    </div>
                </div>
                <label>
                    <textarea className="comment-content" placeholder="请输入对该课程的评价"/>
                </label>
                <div className="submit">评论</div>
            </div>

        </div>

    )
}