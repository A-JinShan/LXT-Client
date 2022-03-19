import {useEffect, useState} from "react";
import Link from "next/link";
import {getUser, updateStudyHistory} from "../../api/userApi";
import {useRouter} from "next/router";
import {getCourseDetailInFo} from "../../api/courseApi";
import {baseURL} from "../../tool/Ajax";
require('./index.less')

export default function CoursePlayer({data}) {
    const router = useRouter()
    const [currentOutlineIndex,setCurrentOutlineIndex] = useState(-1)
    const [dp,setDp] = useState()
    const [courseTitle,setCourseTitle] = useState()

    useEffect(() => {
        if (data.length === 0) return;
        import("dplayer").then(({default: DPlayer}) => {
            const dp = new DPlayer({
                container: document.getElementById('like-player'),
                screenshot: true,
                video: {
                    url: ""
                }
            });
            setDp(dp)

            let {o_id} = router.query
            let index = data.findIndex(item => item.id + "" === o_id + "")

            setCurrentOutlineIndex(index === -1 ? 0 : index)
        })
        getCourseDetailInFo(router.query.id).then(result =>{
            setCourseTitle(result.data[0].title)
        })
    }, [data,router.query])


    useEffect(() => {
        if(data.length === 0 || currentOutlineIndex <0 || currentOutlineIndex > data.length-1) return;
        let {video_url,id} = data[currentOutlineIndex]
        if(dp){

            getUser().then(userInfo =>{
                updateStudyHistory(userInfo.id,router.query.id,id,1)
            })

            dp.switchVideo({
                url: baseURL +video_url,
            })
            dp.play()
        }
    }, [currentOutlineIndex,data,dp,router.query.id])


    return (
        <div className="play-container">
            <div className="left">
                <div className="top">
                    <Link  href={"/course/detail?id="+router.query.id}><a className="back-course">返回课程主页</a></Link>
                    <span className="pre-course" onClick={()=>{
                        let destIndex =(currentOutlineIndex-1) < 0 ? 0 : (currentOutlineIndex-1)
                        setCurrentOutlineIndex(destIndex)
                    }}/>
                </div>
                <div className="play-pane">
                    <p className="class-title">{courseTitle}</p>
                    <div className="player">
                        <div id="like-player">

                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <span className="next-course" onClick={()=>{
                        let destIndex =(currentOutlineIndex+1) > (data.length-1) ? (data.length-1) : (currentOutlineIndex+1)
                        setCurrentOutlineIndex(destIndex)
                    }}/>
                </div>
            </div>
            <div className="right">
                <div className="title">
                    课程目录
                </div>
                <div className="items">
                    <div className="course-dg no-view">
                        <ul className="dg">
                            {
                                data.map((item,index) =>{
                                    return (
                                        <li key={item.id}  className={index === currentOutlineIndex ? "current" : ""} onClick={()=>{
                                            setCurrentOutlineIndex(index)
                                        }}>
                                            <span className="c-num">课时{item.num}: </span>
                                            <span className="c-progress"/>
                                            <span className="c-title">{item.title}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}