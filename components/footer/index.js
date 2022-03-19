import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require('./index.less')

export default function Footer({data}) {
    return (
        <div className="footer">
            <div className="content bx">
                <div className="left">
                    <p className="intro">撩课云课堂 是掘智公司（itlike.com）旗下专注职业技能提升的在线学习平台。</p>
                    <ul className="friend-link">
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">联系我们</a></li>
                        <li><a href="#">帮助中心</a></li>
                        <li><a href="#">撩课论坛</a></li>
                    </ul>
                    <p className="ban">©2018-2020 课程内容版权均归 撩课教育 所有 沪ICP备18036896号</p>
                </div>
                <div className="right">
                    <div className="ad-image">
                        <div className="left-ad">
                            <div className="ewm-pane">
                                {/*<img src={baseURL + data.wb_qrcode} alt=""/>*/}
                                {
                                    !data.wb_qrcode ? "" : <Image src={baseURL + data.wb_qrcode} layout={"fill"} objectFit={"cover"}  alt=""/>
                                }
                            </div>
                        </div>
                        <div className="right-ad">
                            <div className="ewm-pane">
                                {/*<img src={baseURL + data.app} alt="" />*/}
                                {
                                    !data.app ?  "" : <Image src={baseURL + data.app} layout={"fill"} objectFit={"cover"}  alt=""/>
                                }

                            </div>
                        </div>
                    </div>
                    <p className="second-line">
                        客服热线 <span className="time">09:00-19:00</span>
                    </p>
                    <p className="tel">{data.tel}</p>
                </div>
            </div>
        </div>
)
}