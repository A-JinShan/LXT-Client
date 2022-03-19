import CategorySelectionBar from "../../components/categorySelectionBar";
import SectionContainer from "../../components/sectionContainer";
import CourseCard from "../../components/courseCard";
import {getCourseByCategoryId, getCourseCategory} from "../../api/courseApi";
import {useEffect, useState} from "react";

export default function Course({courseCategoryData, courseList}) {

    const [currentCategoryID,setCurrentCategoryID] = useState(-1)
    const [data,setData] = useState(courseList)

    useEffect(()=>{
        //当分类ID改变时，发送网络请求，获取分类数据，并设置当前状态数据，状态数据改变时触发2重新渲染
        getCourseByCategoryId(currentCategoryID).then(result => {
            setData(result.data)
        })
    },[currentCategoryID])

    return (
        <div style={{minHeight:"70vh"}}>
            <CategorySelectionBar data={courseCategoryData} handlerClick={(item)=>{
                //当点击分类列表时，设置分类列表ID
                setCurrentCategoryID(item.id)
            }}/>
            <div style={{marginTop: "30px"}} className={"bx"}>
                <SectionContainer>
                    {
                        data.map(item => <CourseCard key={item.id} data={item}/>)
                    }
                </SectionContainer>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const result = await Promise.all([getCourseCategory(), getCourseByCategoryId()])
    let [courseCategoryData, courseList] = result.map(item => item.data)
    courseCategoryData = [{id:-1,title:"全部"},...courseCategoryData]

    return {
        props: {
            courseCategoryData,
            courseList
        },
    }
}