import NavBar from "../components/navBar";
import MiniNavBar from "../components/miniNarBar";
import Footer from "../components/footer";
import FixedCard from "../components/fixedCard";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getConfigData} from "../api/homeApi";
import Head from "next/head";

export default function MainLayout({children}){
    const router = useRouter()
    const [configData,setConfigData] = useState({})

    useEffect(()=>{
        getConfigData().then(result => {
            setConfigData(result.data[0])
        })
    },[])

    return(
        <>
            <Head>
                <title>撩学堂-在线教育</title>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
                <meta name="keyword" content="全栈,大数据,人工智能,前端,后端,React,Vue,Node"/>
                <meta name="description" content="撩课, 是一家致力于打造高质量课程的平台!圆您coding梦!"/>
            </Head>
            {router.pathname ==='/' ? <NavBar data={configData}/> : <MiniNavBar/>}
            {children}
            <Footer data={configData}/>
            <FixedCard data={configData}/>
        </>
    )
}