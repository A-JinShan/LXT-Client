require('./index.less')

export default function SectionNotion({title}){
    return(
        <div className="section-notice">
            <div className="content bx">
                <ul className="menus">
                    <li className="current"><a>{title}</a></li>
                </ul>
            </div>
        </div>
    )
}