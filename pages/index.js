import Lubo from "../components/lunbo";
import SelectionContainer from "../components/sectionContainer";
import CourseCard from "../components/courseCard";
import TeacherCard from "../components/teacherCard";
import ArticleCard from "../components/articleCard";
import {getFocusCourses, getHotCourse, getLastArticle, getStarTeachers} from "../api/homeApi";
import "../tool/arrayTool"
export default function Home({focusCourseData,hotCourseData,starTeacherData,lastArticleData}) {

    const [left,right] = lastArticleData.splitTow()

    return (
        <div>
            <Lubo data={focusCourseData}/>
            <SelectionContainer title={"- 热 . 门 . 好 . 课 -"} moreText={"更多>"} moreHref={"/course"}>
                {
                    hotCourseData.map(item => <CourseCard key={item.id} data={item} />)
                }
            </SelectionContainer>
            <SelectionContainer title={"- 明 . 星 . 讲 . 师 -"} moreText={"更多>"} moreHref={"/teacher"}>
                {
                    starTeacherData.map(item => <TeacherCard key={item.id} data={item} />)
                }
            </SelectionContainer>

            <SelectionContainer title={"- 学 . 院 . 新 . 闻 -"} moreText={"更多>"} moreHref={"/article"}>
                <ArticleCard data={left}/>
                <ArticleCard data={right}/>
            </SelectionContainer>
        </div>
    )
}

export async function getServerSideProps(context) {

    const result = await Promise.all([getFocusCourses(),getHotCourse(),getStarTeachers(),getLastArticle()])
    const  [focusCourseData,hotCourseData,starTeacherData,lastArticleData] = result.map(item =>item.data)
    // console.log(focusCourse,starTeacher,hotCourse,lastArticle)
    return {
        props: {
            focusCourseData,
            hotCourseData,
            starTeacherData,
            lastArticleData
        },
    }
}
