require('./index.less')
export default function SearchResultContainer({title,children}){
    return (
        <div className="search-result-content bx">
            <div className="search-result">
                <div className="title">
                    {title}
                </div>
                {children}
            </div>
        </div>
    )
}