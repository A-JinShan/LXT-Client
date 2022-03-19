import MainLayout from "../layouts/mainLayout"
import "../styles/base.css"
import 'antd/dist/antd.less'


function MyApp({Component, pageProps}) {
    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    )
}

export default MyApp
