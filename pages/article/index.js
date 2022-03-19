import BreadcrumbNav from "../../components/breadcrumbNav";
import ArticleItem from "../../components/articleItem";
import {getArticleList} from "../../api/articleApi";

export default function Article({articlesData =[]}){
    return (
        <div>
            <BreadcrumbNav data={[{id:0,title:"首页",route:"/"},{id:1,title:"文章列表",route:"/article"}]}/>
            <div className={"bx"}>

                {
                    articlesData.map(item => <ArticleItem key={item.id} data={item}/>)
                }
            </div>
        </div>
    )
}

export async function getStaticProps(context){
    const articlesData = (await getArticleList()).data

    return{
        props:{
            articlesData
        },
        revalidate: 10, //静态再生成的时间 单位为秒
    }
}