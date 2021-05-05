import Link from "next/link";

const ListItem = ({ text }: { text: string }) => {
  return (
    <li>
      <div className="flex items-center space-x-4">
        {/* Heroicon name: chevron-right */}
        <svg
          className="flex-shrink-0 h-5 w-5 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <a
          href="#"
          className="text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
        >
          {text}
        </a>
      </div>
    </li>
  );
};
const Item = ({ text, href }: { text: string; href?: string }) => {
  return href ? (
    <Link href={href} as={href}>
      <a>
        <ListItem text={text} />
      </a>
    </Link>
  ) : (
    <ListItem text={text} />
  );
};

export const BreadCrumb = ({
  links,
}: {
  links?: { href?: string; label: string }[];
}) => {
  return (
    <nav className="flex my-6 " aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4 mx-auto">
        <Link href={"/"}>
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                {/* Heroicon name: home */}
                <svg
                  className="flex-shrink-0 h-5 w-5 transition duration-150 ease-in-out"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </a>
              <span className="sr-only">Home</span>
            </div>
          </li>
        </Link>
        {links?.map((cur, i) => {
          return <Item key={i} text={cur.label} href={cur.href} />;
        })}
      </ol>
    </nav>
  );
};
