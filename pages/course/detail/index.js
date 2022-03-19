import CourseIntroPane from "../../../components/courseIntroPane";
import CourseDetailContainer from "../../../components/courseDetailContainer";
import RelationTeacherCard from "../../../components/relationTeacherCard";
import BreadcrumbNav from "../../../components/breadcrumbNav";
import CourseCommitPane from "../../../components/courseCommitPane";
import CourseCommitList from "../../../components/courseCommitList";
import CourseOutline from "../../../components/courseOutline";
import {getCourseComments, getCourseDetailInFo, getCourseOutline} from "../../../api/courseApi";
import {useEffect, useState} from "react";

export default function CourseDetail({courseDetailInfo, courseOutline}) {
    const {
        id,
        title,
        fm_url,
        intro,
        teacher_id,
        name,
        header,
        position,
        comment_count,
        course_avg_score
    } = courseDetailInfo

    const [courseComments,setCourseComments] = useState([])

    useEffect(()=>{
        getCourseComments(id).then(result =>{
            setCourseComments(result.data)
        })
    },[id])

    return (
        <>
            <BreadcrumbNav data={[{id: 0, title: "首页", route: "/"}, {id: 1, title: "课程列表", route: "/article"},{id: 2, title: `${courseDetailInfo.title}`, route: ""}]}/>

            <div className={"bx"}>
                <CourseIntroPane data={{id, title, fm_url, name, position, comment_count, course_avg_score}}/>
                <CourseDetailContainer descContent={<div dangerouslySetInnerHTML={{__html: intro}}/>}
                                       outlineContent={<CourseOutline data={courseOutline} course_id={id}/>}
                >
                    <RelationTeacherCard data={{teacher_id, name, header, position}}/>
                    <CourseCommitPane/>
                    <CourseCommitList data={courseComments}/>
                </CourseDetailContainer>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const {id} = context.query

    if (id === undefined) {
        return {
            redirect: {
                destination: '/course',
                permanent: false,
            }
        }
    } else {
        const courseDetailInfo = (await getCourseDetailInFo(id)).data[0]
        const courseOutline = (await getCourseOutline(id)).data
        return {
            props: {
                courseDetailInfo,
                courseOutline
            }
        }
    }
}