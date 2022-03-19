import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import {getUser, removeUser} from "../../api/userApi";
import {useEffect, useState} from "react";
import {baseURL} from "../../tool/Ajax";

export default function UserHeader({_showOrHiddenPane,_flashPages,flashFlag}){

    const [user,setUser] = useState({})

    useEffect(()=>{
        getUser().then(result =>{
            setUser(result)
        })
    },[flashFlag])

    return (
        <>
            {
                user.id === undefined ? <div className="intro">
                    <div className="user" onClick={() => {
                        _showOrHiddenPane(1)
                    }}>
                        <span className="nick-name">登录</span>
                        <Avatar size={"large"} icon={<UserOutlined/>}/>
                    </div>
                </div> : <div className="intro">
                    <div className="user">
                        <span className="nick-name">{user.nick_name}</span>
                        <Avatar size={"large"} src={baseURL + user.header}/>
                    </div>
                    <div className="operation-pane">
                        <ul className="operation">
                            <li><a href="#">撩课学院</a></li>
                            <li><Link href={"/mine"}><a>我的学习</a></Link></li>
                            <li><Link href={"/mine/setting"}><a>设置</a></Link></li>
                            <li className="exit" onClick={() => {
                                removeUser()
                                _flashPages()
                            }}>退出
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}