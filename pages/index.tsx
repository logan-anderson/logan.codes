import Link from 'next/link'
import Layout from '../components/layout/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    
      
    
      <section className="py-12 px-4 text-center">
        <div className="w-full max-w-2xl mx-auto">
          <span className="text-sm font-semibold">TAGLINE</span>
          <h2 className="text-5xl mt-2 mb-6 leading-tight font-heading">No paper plane can be made without paper</h2>
          <a className="text-blue-700 hover:underline" href="#">Learn more &raquo;</a>
        </div>
      </section>
    
      <section className="py-12 px-4">
        <h2 className="text-3xl text-center mb-8 font-heading">Latest posts</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="h-full">
              {/* <img className="mb-4" src="placeholders/pictures/work.jpg" alt=""><small>22 Oct 2019</small> */}
              <h3 className="text-2xl mt-2 mb-4 font-heading">Being world’s best boss</h3>
              <a className="text-blue-700 hover:underline" href="#">Read more &raquo;</a>
            </div>
          </div>
          <div className="lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="h-full">
              {/* <img className="mb-4" src="placeholders/pictures/office.jpg" alt=""><small>22 Oct 2019</small> */}
              <h3 className="text-2xl mt-2 mb-4 font-heading">Understanding the paper</h3>
              <a className="text-blue-700 hover:underline" href="#">Read more &raquo;</a>
            </div>
          </div>
          <div className="lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="h-full">
              {/* <img className="mb-4" src="placeholders/pictures/work.jpg" alt=""><small>22 Oct 2019</small> */}
              <h3 className="text-2xl mt-2 mb-4 font-heading">Dwight doesn’t understand the paper</h3>
              <a className="text-blue-700 hover:underline" href="#">Read more &raquo;</a>
            </div>
          </div>
        </div>
      </section>
    
      
  </Layout>
)

export default IndexPage
