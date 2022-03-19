import SearchResultContainer from "../../components/searchResultContainer";
import SectionContainer from "../../components/sectionContainer";
import CourseCard from "../../components/courseCard";
import TeacherCard from "../../components/teacherCard";
import ArticleItem from "../../components/articleItem";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getSearchResult} from "../../api/searchApi";

export default function Search(){

    const router = useRouter()

    const [searchResult,setSearchResult] = useState({
        courseResult:[],
        teacherResult:[],
        articleResult:[]
    })

    useEffect(()=>{
        const {category,kw} = router.query
        if(category === undefined) return
        getSearchResult(category,kw).then(result => {
            if(category === "all"){
                setSearchResult(result.data)
            }else if(category ==="course"){
                setSearchResult({
                    courseResult:result.data,
                    teacherResult:[],
                    articleResult:[]
                })
            }else if(category ==="teacher"){
                setSearchResult({
                    courseResult:[],
                    teacherResult:result.data,
                    articleResult:[]
                })
            }else if(category ==="article"){
                setSearchResult({
                    courseResult:[],
                    teacherResult:[],
                    articleResult:result.data
                })
            }
        })
    },[router.query])

    return(
        <div style={{minHeight:"70vh"}}>

            {
                searchResult.courseResult.length <= 0 ? "" : <SearchResultContainer title={"课程的搜索结果:"}>
                    <SectionContainer>
                        {searchResult.courseResult.map(item => <CourseCard key={item.id} data={item}/>)}
                    </SectionContainer>
                </SearchResultContainer>
            }

            {
                searchResult.teacherResult.length <= 0 ? "" : <SearchResultContainer title={"讲师的搜索结果"}>
                    <SectionContainer>
                        {searchResult.teacherResult.map(item => <TeacherCard key={item.id} data={item}/>)}
                    </SectionContainer>
                </SearchResultContainer>
            }

            {
                searchResult.articleResult.length <= 0 ? "" : <SearchResultContainer title={"文章的搜索结果"}>
                    {searchResult.articleResult.map(item => <ArticleItem key={item.id} data={item}/>)}
                </SearchResultContainer>
            }

        </div>
    )
}