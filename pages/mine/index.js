import SectionNotion from "../../components/sectionNoticeContainer";
import SectionContainer from "../../components/sectionContainer";
import CourseProgressCard from "../../components/courseProgressCard";
import UserIntroPane from "../../components/userIntroPane";
import {useEffect, useState} from "react";
import {getStudyHistory, getUser, isLogin} from "../../api/userApi";
import {useRouter} from "next/router";


export default function MineStudy(){

    const router = useRouter()
    const [userInfo,setUserInfo] = useState({})
    const [studyHistory,setStudyHistory] = useState([])

    useEffect(()=>{
        getUser().then(result => {
            if(result.id === undefined){
                router.replace('/')
            }else{
                setUserInfo(result)
                getStudyHistory(result.id).then(({data})=>{
                    setStudyHistory(data)
                })
            }

        })
    },[router])

    return (
        <div style={{minHeight:"70vh"}}>
            <UserIntroPane data={userInfo}/>
            <SectionNotion title={"我的学习"}/>
            <SectionContainer>
                {
                    studyHistory.map(item => <CourseProgressCard key={item.id} data={item}/>)
                }
            </SectionContainer>
        </div>
    )
}