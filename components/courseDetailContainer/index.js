import {useState} from "react";

require('./index.less')
export default function CourseDetailContainer({children,descContent,outlineContent}) {
    const [current,setCurrent] = useState(0)

    return (
        <div className="detail-container">
            <div className="top">
                <ul className="tabs">
                    {
                        ["课程详情","课程大纲"].map((item,index) => {
                            return <li key={index} className={index===current ? "current":""} onClick={()=>{
                                setCurrent(index)
                            }}>{item}</li>
                        })
                    }
                </ul>
            </div>
            <div className="bottom">
                <div className="left">
                    <ul className="panes">
                        <li className={current === 0 ? "current" : ""}>
                            {descContent}
                        </li>
                        <li className={current === 1 ? "current" : ""}>
                            {outlineContent}
                        </li>
                    </ul>
                </div>
                <div className="right">
                    {children}
                </div>
            </div>
        </div>
    )
}