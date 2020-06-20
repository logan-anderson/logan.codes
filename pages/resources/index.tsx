import getLinks from "../../utils/getLinks"
import Layout from "../../components/layout/Layout"

export default (props: any)=>{
    

    return (<Layout preview={false}>
        <div>
        { JSON.stringify(props.links) }
        </div>
    </Layout>)
}


export const getStaticProps = async function (){
    const data = await getLinks()
    return {
        props: {
            links: data
        }
    }
}