import CoursePlayer from "../../../components/coursePlayer";
import {useEffect, useState} from "react";
import {getCourseOutline} from "../../../api/courseApi";
import {useRouter} from "next/router";

export default function CoursePlay(){
    const router = useRouter()
    const [courseOutline,setCourseOutline] = useState([])
    useEffect(()=>{
        if(!router.query.id) return
        getCourseOutline(router.query.id).then(result => {
            setCourseOutline(result.data)
        })
    },[router.query.id])

    return (
        <CoursePlayer data={courseOutline} />
    )
}