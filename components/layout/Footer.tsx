import Link from 'next/link';

const AppFooter = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between p-4">
      <div className="w-full lg:w-auto lg:mr-6 mb-4 lg:mb-0 text-center">
        &copy; 2019 Dunder Mifflin
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
        <div className="mx-auto lg:mx-0 lg:ml-auto">
          <Link href="/" >
            <a
              className="inline-block mt-0 text-blue-900 hover:text-blue-700"
              href="#"
            >
              Products
          </a>
          </Link>
          <Link href="/" >
            <a
              className="inline-block mt-0 ml-8 text-blue-900 hover:text-blue-700"
              href="#"
            >
              Products
          </a>
          </Link>
          <Link href="/" >
            <a
              className="inline-block mt-0 ml-8 text-blue-900 hover:text-blue-700"
              href="#"
            >
              Products
          </a>
          </Link>
        </div>
        <div className="flex justify-center mt-4 lg:mt-0 lg:ml-8">
          <img className="w-6 h-6 mr-6" src="placeholders/icons/message.svg" alt=""/>
          <img className="w-6 h-6" src="placeholders/icons/share.svg" alt=""/>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
