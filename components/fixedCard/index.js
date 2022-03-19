import Image from "next/image";
import {baseURL} from "../../tool/Ajax";

require('./index.less')
export default function FixedCard({data}) {
    return (
        <div className="fixed-contact">
            <div className="contact">

            </div>
            <div className="app">
                <div className="ewm-pane">
                    {/*<img src={baseURL + data.app} alt="" />*/}
                    {
                        !data.app ? "" : <Image src={baseURL + data.app} layout={"fill"} objectFit={"cover"}  alt=""/>
                    }
                </div>
            </div>
            <div className="back-top">

            </div>
        </div>

    )
}