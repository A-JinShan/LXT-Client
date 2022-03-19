import {ajax} from "../tool/Ajax";

export const USERKEY = "USERKEY"

export const saveUser = (user) => {
    import("storejs").then(({default:store})=>{
        store.set(USERKEY, user)
    })
}

export const getUser = async () => {
    let {default: store} = await import("storejs")
    return store.get(USERKEY) || {}
}


export const isLogin = async () => {
    let userInfo = await getUser()
    return userInfo.id !== undefined;
}

export const removeUser = () => {
    import("storejs").then(({default:store})=>{
        store.remove(USERKEY)
    })
}

export const login = (account,password) => ajax('/api/client/user/login',{account,password},"post")

export const register = (account,password) => ajax('/api/client/user/register',{account,password},"post")

export const getStudyHistory = (user_id) => ajax('/api/client/user/study_history',{user_id})

export const updateStudyHistory = (user_id,course_id,outline_id,is_finish) => ajax('/api/client/user/update_study_history',{user_id,course_id,outline_id,is_finish},"post")

export const updateUserInfo = (user_id,nick_name,intro)=>ajax('/api/client/user/update_info',{user_id,nick_name,intro},"post")

export const updateAccountPassword = (account,password,new_password)=>ajax('/api/client/user/update_password',{account,password,new_password},"post")