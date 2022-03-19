import {useRouter} from "next/router";

require("./index.less")
import Link from "next/link";
import {menuData} from "../../config/menuConfig";
import {useState} from "react";
import LoginOrRegisterPane from "../loginOrRegisterPane";
import Image from "next/image";
import UserHeader from "../userHeader";
import {baseURL} from "../../tool/Ajax";


export default function NavBar({data}) {
    const router = useRouter()
    const [showOrHiddenFlag, setShowOrHiddenFlag] = useState(0)
    const [flashFlag,setFlashFlag] = useState(false)

    const _flashPages = ()=>{
        setFlashFlag(!flashFlag)
    }
    const _showOrHiddenPane = (flag = 0) => {
        setShowOrHiddenFlag(flag)
    }

    return (
        <>
            <div id="nav-bar">
                <div className="content bx">
                    <div className="top">
                        <div className="left">
                            <h1 className="logo">
                                <a href="#">
                                    撩学堂
                                </a>
                            </h1>
                        </div>
                        <div className="center">
                            <form action={"/search"}>
                                <div className="search-bar">
                                    <div className="category">
                                        <label>
                                            <select name="category">
                                                <option value="all">全部</option>
                                                <option value="course">课程</option>
                                                <option value="teacher">讲师</option>
                                                <option value="article">文章</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="keyword">
                                        <label>
                                            <input type="text" placeholder="请输入搜索关键字" name="kw"/>
                                        </label>
                                    </div>
                                    <div className="submit-btn">
                                        <input className="iconfont" type="submit" value="&#xe610;&nbsp;搜索"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            <UserHeader _showOrHiddenPane={_showOrHiddenPane} _flashPages={_flashPages} flashFlag={flashFlag}/>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <ul className="menus">
                                {
                                    menuData.map(item => {
                                        return (
                                            <li key={item.id}
                                                className={router.pathname === item.route ? "current" : ""}>
                                                <Link href={item.route}><a>{item.title}</a></Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="right">
                            <ul>
                                <li className="iconfont icon-liwu">
                                    关注领取福利
                                    <div className="ad-pane">
                                        <div className="title">关注撩课公众号</div>
                                        <div className="sub-title">- 领取课程免费福利,超值学习资料 -</div>
                                        {/*<img className="ewm" src={baseURL + data.wechat_qrcode} alt=""/>*/}
                                        {
                                            !data.wechat_qrcode ? "" :
                                                <div className={"ewm"}>
                                                    <Image src={baseURL + data.wechat_qrcode} layout={"fill"}
                                                           objectFit={"cover"} alt=""/>
                                                </div>
                                        }
                                    </div>
                                </li>
                                <li className="iconfont icon-weixinxiaochengxu">
                                    微信小程序
                                    <div className="ad-pane">
                                        <div className="title">撩课-小程序</div>
                                        <div className="sub-title">- 关注关注 -</div>
                                        {/*<img className="ewm" src={baseURL + data.mini_program} alt=""/>*/}
                                        {
                                            !data.mini_program ? "" :
                                                <div className={"ewm"}>
                                                    <Image src={baseURL + data.mini_program} layout={"fill"}
                                                       objectFit={"cover"} alt=""/>
                                                </div>
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {
                showOrHiddenFlag ?
                    <LoginOrRegisterPane showOrHiddenFlag={showOrHiddenFlag} _showOrHiddenPane={_showOrHiddenPane}
                                         _flashPages={_flashPages}/> : ""
            }
        </>

    )
}