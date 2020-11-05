// import getLinks from "../../utils/getLinks"
import Layout from "../../components/layout/Layout";
import Collapsible from "react-collapsible";

const catagories = require("../../content/resources.json").catagories;
const ResourcesPage = () => {
  // get all the catagories

  return (
    <Layout preview={false} title="Resources">
      <div className="md:mx-32">
        {catagories.map((cat: any) => {
          return (
            <Collapsible
              key={cat.id}
              trigger={cat.label}
              className="p-3"
              openedClassName="p-3"
              triggerClassName="hover:underline hover:cursor-pointer hover:bg-blue-500 hover:text-white py-2 px-4 m-2 border border-blue-500 hover:border-transparent rounded-full bg-transparent text-blue-700"
              triggerOpenedClassName="hover:underline hover:cursor-pointer hover:bg-blue-500 hover:text-white py-2 px-4 m-2 border border-blue-500 hover:border-transparent rounded-full bg-blue-500 text-white"
              transitionTime={200}
            >
              <div className="p-4 ml-4">
                <ul>
                  {cat.entries.map((ent: any) => {
                    return (
                      <li key={ent.id}>
                        <a
                          href={ent.link}
                          target="_blank"
                          className="hover:underline hover:text-blue"
                        >
                          {ent.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </Layout>
  );
};

export default ResourcesPage;
