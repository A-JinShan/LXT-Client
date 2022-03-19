import {useEffect, useRef, useState} from "react";
import {message} from "antd";
import {login, register, saveUser} from "../../api/userApi";
import {useRouter} from "next/router";

require('./index.less')

export default function LoginOrRegisterPane({showOrHiddenFlag,_showOrHiddenPane,_flashPages}){
    const router = useRouter()

    const [current,setCurrent] = useState(0)

    const r_account = useRef()
    const r_password = useRef()
    const r_r_password = useRef()

    const l_account = useRef()
    const l_password = useRef()



    const _handlerRegister = (event)=>{
        event.preventDefault()
        const accountV = r_account.current.value
        const passwordV = r_password.current.value
        const r_passwordV = r_r_password.current.value
        if(passwordV.trim() !== r_passwordV.trim()){
            return message.warn("密码和确认密码不一致")
        }else{
            register(accountV.trim(),passwordV.trim()).then(result => {
                if(result.code === 0){
                    setCurrent(0)
                    return message.success("注册成功")
                }else {
                    message.error("用户名已存在")
                }
            })
        }
    }

    const _handlerLogin = (event) =>{
        event.preventDefault()
        const accountV = l_account.current.value
        const passwordV = l_password.current.value
        if(accountV.trim().length>0 && passwordV.trim().length>0){
            login(accountV.trim(),passwordV.trim()).then(result => {
                if(result.data.id !== undefined){
                    saveUser(result.data)
                    _showOrHiddenPane(0)
                    _flashPages()
                    return message.success("登录成功")
                }else{
                    return message.error("账号或密码错误")
                }
            })
        }else {
            return message.warn("请检查输入数据的格式")
        }

    }

    useEffect(()=>{
        const _handlerShowOrHideMark = ()=>{
            let lr_mask = document.getElementsByClassName("lr-mask")[0];
            if(showOrHiddenFlag === 0){
                lr_mask.className = "lr-mask"
            }else {
                lr_mask.className = "lr-mask show"
            }
        }
        _handlerShowOrHideMark()
    },[showOrHiddenFlag])

    return(
        <div className="lr-mask">
            <div className="lr-pane">
                <span className="close iconfont icon-icon_close" onClick={()=>{
                    if(router.pathname !== "/course/play"){
                        _showOrHiddenPane(0)
                    }
                }}/>
                <ul className="tabs">
                    {
                        ["账号登录","立即注册"].map((item,index) => {
                            return <li key={index} className={index===current ? "current":""} onClick={()=>{
                                setCurrent(index)
                            }}>{item}</li>
                        })
                    }
                </ul>
                <ul className="panes">
                    <li className={current === 0 ? "current": ""}>
                        <form onSubmit={_handlerLogin}>
                            <label>
                                <span className="iconfont icon-yonghu"/>
                                <input ref={l_account} name="account" type="text" placeholder="请输入账号"/>
                            </label>

                            <label>
                                <span className="iconfont icon-mima1"/>
                                <input ref={l_password} name="pwd" type="password" placeholder="请输入密码"/>
                            </label>

                            <input className="btn" type="submit" value="立即登录"/>

                        </form>
                    </li>
                    <li className={current === 1 ? "current" : ""}>

                        <form onSubmit={_handlerRegister}>
                            <label>
                                <span className="iconfont icon-yonghu"/>
                                <input ref={r_account} name="account" type="text" placeholder="请输入账号"/>
                            </label>

                            <label>
                                <span className="iconfont icon-mima1"/>
                                <input ref={r_password} name="pwd" type="text" placeholder="请输入密码"/>
                            </label>

                            <label>
                                <span className="iconfont icon-querenmima"/>
                                <input ref={r_r_password} name="pwd" type="text" placeholder="请再次输入密码"/>
                            </label>

                            <input className="btn" type="submit" value="立即注册"/>

                        </form>
                    </li>
                </ul>
            </div>
        </div>
    )
}