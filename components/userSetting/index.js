import {useEffect, useState} from "react";
import {getUser, removeUser, saveUser, updateAccountPassword, updateUserInfo} from "../../api/userApi";
import {useRouter} from "next/router";
import {message} from "antd";
import axios from "axios";
import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require('./index.less')

export default function UserSetting(){

    const router = useRouter()
    const [current,setCurrent] = useState(0)
    const [userInfo,setUserInfo] = useState({})

    useEffect(()=>{
        getUser().then(result=>{
            if(result.id === undefined){
               router.replace('/')
            }else{
                setUserInfo(result)
            }
        })
    },[router])

    useEffect(() => {
        let upBtn = document.querySelector(".header-wrap>.mask");
        let headerFile = document.querySelector(".header-wrap>.header-file")
        upBtn.onclick = function () {
            headerFile.click()
        }
        headerFile.onchange = function () {
            let files = headerFile.files;
            if (files.length === 0) return;
            let fileNameArr = files[0].name.split(".");
            let fileExtName = fileNameArr[fileNameArr.length - 1];
            if (!["jpg", "jpeg", "png"].includes(fileExtName)) {
                message.warn("请上传jpg | jpeg | png 图片文件!")
                return;
            }
            // image.src = getObjectURL(files[0])
            // 执行更新头像的请求, 并赋值 newImageSrc
            let formData = new FormData()
            formData.append("user_id", userInfo.id)
            formData.append("header", files[0], files[0].name)
            axios.post("/api/client/user/update_header", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            }).then(response=>{
                console.log(response)
                message.success("当前头像更新成功")
                setUserInfo(response.data.data)
                saveUser(response.data.data)
                router.reload()
            }).catch(err=>{
                message.error("头像更新失败")
            })

        }

        window.userEdit.onsubmit = function (evt) {
            evt.preventDefault()
            let nick_name = window.userEdit.nick_name.value;
            let intro = window.userEdit.intro.value;

            updateUserInfo(userInfo.id, nick_name, intro).then(result=>{
                if (result.code === 0) {
                    message.success("资料更新成功")
                    setUserInfo(result.data)
                    saveUser(result.data)
                    router.reload()
                } else {
                    message.error("资料更新失败")
                }
            })


        }

        window.accountEdit.onsubmit = function (evt) {
            evt.preventDefault();
            let account = window.accountEdit.account.value;
            let pwd = window.accountEdit.pwd.value;
            let new_pwd = window.accountEdit.new_pwd.value;

            updateAccountPassword(account, pwd, new_pwd).then(result=>{
                if (result.code === 0) {
                    message.success("更新密码成功")
                    removeUser()
                    router.reload()
                } else {
                    message.error("更新密码失败!")
                }
            })

        }
    }, [userInfo.id,router])

    return (
        <div className="bx edit-pane">
            <ul className="tabs">
                <li className={current === 0 ? "current": ""} onClick={() => setCurrent(0)}>资料设置</li>
                <li className={current === 1 ? "current": ""} onClick={() => setCurrent(1)}>账号设置</li>
            </ul>
            <ul className="panes">
                <li className={current === 0 ? "current": ""}>
                    <p className="notice">完善个人资料是让别人认识你的第一步</p>
                    <table>
                        {/*<caption>用户头像</caption>*/}
                        <tbody>
                        <tr>
                            <td><label> </label></td>
                            <td>
                                <div className="header-wrap">
                                    {/*<img className="header-img"*/}
                                    {/*     src={baseURL + userInfo.header}*/}
                                    {/*     alt=""/>*/}
                                    {
                                        !userInfo.header ? "" :
                                        <Image src={baseURL + userInfo.header} layout={"fill"}
                                               objectFit={"cover"} alt=""/>
                                    }
                                    <div className="mask">点击上传头像</div>
                                    <input className="header-file" type="file" name="header"/>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <form action="" id="userEdit">
                        <table>
                            {/*<caption>基本信息</caption>*/}
                            <tbody>
                            <tr>
                                <td><label htmlFor="nick_name">昵称: </label></td>
                                <td><input type="text" name="nick_name" id="nick_name" defaultValue={userInfo.nick_name}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="intro">简介: </label></td>
                                <td><textarea id="intro" name="intro" defaultValue={userInfo.intro}/></td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td/>
                                <td>
                                    <input type="submit" value="保存"/>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </form>
                </li>
                <li className={current === 1 ? "current": ""}>
                    <p className="notice">请保护好你的账号密码</p>
                    <form action="" id="accountEdit">
                        <table>
                            {/*<caption>账户信息</caption>*/}
                            <tbody>
                            <tr>
                                <td><label htmlFor="account">账号: </label></td>
                                <td><input type="text" name="account" id="account" defaultValue={userInfo.account} readOnly/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="pwd">旧密码: </label></td>
                                <td><input type="text" name="pwd" id="pwd"/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="new-pwd">新密码: </label></td>
                                <td><input type="text" name="new_pwd" id="new-pwd"/></td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td/>
                                <td>
                                    <input type="submit" value="保存"/>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </form>
                </li>
            </ul>
        </div>
    )
}