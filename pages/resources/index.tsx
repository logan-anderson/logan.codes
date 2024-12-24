import Layout from "~/components/layout/Layout";
import Collapsible from "react-collapsible";

import categoriesData from "../../content/resources.json";

interface Entry {
  id: string;
  label: string;
  link: string;
}

interface Category {
  id: string;
  label: string;
  entries: Entry[];
}

const categories: Category[] = categoriesData.categories;

const ResourcesPage = () => {
  // get all the categories

  return (
    <Layout preview={false} title="Resources">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Resources
        </h1>

        <div className="space-y-4">
          {categories.map((cat) => (
            <Collapsible
              key={cat.id}
              trigger={cat.label}
              className="rounded-lg border border-gray-200 dark:border-gray-700"
              openedClassName="rounded-lg border border-gray-200 dark:border-gray-700"
              triggerClassName="w-full px-6 py-4 flex items-center justify-between text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150"
              triggerOpenedClassName="w-full px-6 py-4 flex items-center justify-between text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-t-lg"
              transitionTime={200}
            >
              <div className="p-6 bg-white dark:bg-gray-900 rounded-b-lg">
                <ul className="space-y-3">
                  {cat.entries.map((ent) => (
                    <li key={ent.id}>
                      <a
                        href={ent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150"
                      >
                        {ent.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
