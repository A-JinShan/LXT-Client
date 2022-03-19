import Link from "next/link";
require('./index.less')

export default function BreadcrumbNav({data=[]}){
    return (
        <div className="bread-nav">
            <div className="content bx">
                <ul>
                    {
                        data.map(item => <li key={item.id}><Link href={item.route}><a>{item.title}</a></Link></li>)
                    }
                </ul>
            </div>
        </div>
    )
}