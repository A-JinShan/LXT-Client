import CategorySelectionBar from "../../components/categorySelectionBar";
import TeacherItem from "../../components/teacherItem";
import {getTeacherList} from "../../api/teacherApi";
import {useState} from "react";

export default function Teacher({teachersData}) {

    const [isOnlyStar,setIsOnlyStar] = useState(false)

    return (
        <div style={{minHeight:"70vh"}}>
            <CategorySelectionBar data={[{id: 1, title: "全部"}, {id: 2, title: "星级讲师"}]} handlerClick={(item) => {
                //当点击星级讲师时 设置isOnlyStar为true
                setIsOnlyStar(item.id === 2)
            }}/>
            <div className={"bx"}>
                {
                    teachersData.filter(item => {
                        //当isOnlyStar为true时过滤掉不是星级的讲师
                        return isOnlyStar ? item.is_star === 1 : item
                    }).map(item => {
                        return <TeacherItem key={item.id} data={item}/>
                    })
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const teachersData = (await getTeacherList()).data

    return {
        props: {
            teachersData
        },
    }
}