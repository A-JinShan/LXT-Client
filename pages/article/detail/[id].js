import BreadcrumbNav from "../../../components/breadcrumbNav";
import {getArticleDetail, getArticleList} from "../../../api/articleApi";
import {getFormalDate} from "../../../tool/dateTool";
import {useRouter} from "next/router";

require('./index.less')
export default function ArticleDetail({articleDetail}){

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
            <BreadcrumbNav data={[{id:0,title:"首页",route:"/"},{id:1,title:"文章列表",route:"/article"},{id:2,title:articleDetail.title,route:""}]}/>
            <div className="news-detail bx">
                <h3 className="title">{articleDetail.title}</h3>
                <p className="time">{getFormalDate(articleDetail.create_time)}</p>
                <div className="content">
                    <div dangerouslySetInnerHTML={{__html:articleDetail.content}}/>
                </div>
            </div>
        </>

    )
}

export async function getStaticPaths() {
    let Ids = (await getArticleList()).data.map(item => ({params:{id:""+item.id}}))
    return {
        paths: Ids,
        fallback: true,
    };
}

export async function getStaticProps({params}){
    const {id} = params
    if(id === undefined){
        return {
            redirect: {
                destination: '/article',
                permanent: true, //当permanent 为true时必须要有后备页面，如果没有后备页面读属性的时候将会报错
            }
        }
    }else {
        const articleDetail= (await getArticleDetail(id)).data
        return{
            props:{
                articleDetail
            },

        }
    }
}