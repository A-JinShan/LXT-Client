import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require('./index.less')

export default function LunBo({data}) {

    const [currentIndex, setCurrentIndex] = useState(1)

    return (
        <div className="like-lb">
            <ul className="images">
                {data.map(item => {
                    return (
                        <li key={item.id} className={item.id === currentIndex ? "current" : ""}>
                            <Link href={"/course/detail?id=" + item.id}>
                                <a className="lb-bgc">
                                    <div className="back_filter_img" style={{backgroundImage: `url(${baseURL + item.ad_url})`}}/>
                                    {/*<img src={baseURL + item.ad_url} alt=""/>*/}
                                    <div className={"lunbo_img"}>
                                        <div className={"img"}>
                                            <Image src={baseURL + item.ad_url} layout={"fill"} objectFit={"cover"}  alt=""/>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <ul className="titles">
                {data.map(item => {
                    return (
                        <li key={item.id} className={item.id === currentIndex ? "current" : ""} onMouseMove={() => {
                            setCurrentIndex(item.id)
                        }}>
                            <Link href={"/course/detail?id=" + item.id}>
                                <a href="#">{item.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}