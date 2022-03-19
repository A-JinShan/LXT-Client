import {miniMenuData} from "../../config/menuConfig";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {isLogin} from "../../api/userApi";
import LoginOrRegisterPane from "../loginOrRegisterPane";
import UserHeader from "../userHeader";

require('./index.less')
export default function MiniNavBar() {
    const router = useRouter()

    const {category = {},kw=""} = router.query
    const [categoryValue,setCategoryValue] = useState(category)
    const [kwValue,setKwValue] = useState(kw)

    const [showOrHiddenFlag,setShowOrHiddenFlag] = useState(0)
    const [flashFlag,setFlashFlag] = useState(false)

    const _flashPages = ()=>{
        setFlashFlag(!flashFlag)
    }

    const _showOrHiddenPane = (flag=0)=>{
        setShowOrHiddenFlag(flag)
    }

    useEffect(()=>{
        setCategoryValue(category)
        setKwValue(kw)
    },[router.query.category,router.query.kw])

    useEffect(()=>{
        isLogin().then(isLoginStatus=>{
            if(!isLoginStatus && router.pathname === "/course/play" ){
                setShowOrHiddenFlag(1)
            }
        })

    },[router.pathname])

    return (
        <>
            <div className="navbar-mini">
                <div className="content bx">
                    <div className="left">
                        <h1 className="logo">
                            <Link href="/"><a>撩学堂</a></Link>
                        </h1>
                        <ul className="menus">
                            {
                                miniMenuData.map(item => {
                                    return (
                                        <li key={item.id} className={router.pathname === item.route ? "current" : ""}>
                                            <Link href={item.route}><a>{item.title}</a></Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="center">
                        <form action={"/search"}>
                            <div className="search-bar">
                                <div className="category">
                                    <label>
                                        <select name="category" value={categoryValue} onChange={(event)=>{
                                            setCategoryValue(event.target.value)
                                        }}>
                                            <option value="all">全部</option>
                                            <option value="course">课程</option>
                                            <option value="teacher">讲师</option>
                                            <option value="article">文章</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="keyword">
                                    <label>
                                        <input type="text" placeholder="请输入搜索关键字" name="kw" value={kwValue} onChange={(event)=>{
                                            setKwValue(event.target.value)
                                        }}/>
                                    </label>
                                </div>
                                <div className="submit-btn">
                                    <input className="iconfont" type="submit" value="&#xe610;" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <UserHeader _showOrHiddenPane={_showOrHiddenPane} _flashPages={_flashPages} flashFlag={flashFlag}/>
                    </div>

                </div>
            </div>
            {
                showOrHiddenFlag ? <LoginOrRegisterPane showOrHiddenFlag={showOrHiddenFlag} _showOrHiddenPane = {_showOrHiddenPane} _flashPages ={_flashPages}/> : ""
            }
        </>
    )
}