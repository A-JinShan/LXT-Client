import SectionContainer from "../../../components/sectionContainer";
import SectionNotion from "../../../components/sectionNoticeContainer";
import TeacherIntroCard from "../../../components/teacherIntroPane";
import {getTeacherDetail} from "../../../api/teacherApi";
import CourseCard from "../../../components/courseCard";


export default function TeacherDetail({teacherDetail}){
    const {id,name,header,position,intro,is_star, course} = teacherDetail
    return (
       <div style={{minHeight:"70vh"}}>
            <TeacherIntroCard data={{id,name,header,position,intro,is_star}}/>
            <SectionNotion title={"发布课程"}/>
                <div style={{marginTop:"30px"}}>
                    <SectionContainer>
                        {course.map(item => <CourseCard key={item.id} data={item}/>)}
                    </SectionContainer>
                </div>
       </div>
    )
}

export async function getServerSideProps(context){
    const {id} = context.query

    if(id === undefined){
        return {
            redirect: {
                destination: '/teacher',
                permanent: false,
            }
        }
    }else {
        const teacherDetail = (await getTeacherDetail(id)).data
        return{
            props:{
                teacherDetail
            }
        }
    }
}