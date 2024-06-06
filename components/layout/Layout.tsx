import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import Navbar from "./Navbar";
import AppFooter from "./Footer";
import { DarkModeToggleButton } from "../Buttons/DarkModeToggle";
import { useTheme } from "next-themes";

type Props = {
  preview: boolean;
  title?: string;
  description?: string;
  navDisable?: boolean;
  children: React.ReactNode;
};
export const SEO = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const router = useRouter();

  return (
    <DefaultSeo
      openGraph={{
        url: "https://logan.codes" + router.asPath,
        images: [
          {
            width: 754,
            alt: "Logan Anderson",
            url: "https://res.cloudinary.com/dvy3mawsb/image/upload/c_scale,f_auto,o_100,q_58,r_0,w_754/v1620171151/IMG_3988_iqa2nf.jpg",
          },
        ],
      }}
      title={`${title} | Logan`}
      description={
        description ||
        "A simple blog about coding, technology, and coffee by Logan Anderson. Read about the latest in web development, machine learning and other tech topics."
      }
    />
  );
};
const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
  description,
  navDisable,
}) => {
  const { setTheme, resolvedTheme } = useTheme();

  const onClick = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <>
      <SEO title={title || "Logan Anderson"} description={description || ""} />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
        className="bg-white dark:bg-gray-900 "
      >
        <div className="bg-body text-body font-body container mx-auto px-3 sm:px-4">
          {!navDisable && (
            <header>
              <Navbar />
            </header>
          )}
          <main
            style={{
              flex: 1,
              marginTop: "20px",
            }}
          >
            {children}
          </main>
          <AppFooter />
        </div>
      </div>
      <DarkModeToggleButton
        onClick={onClick}
        checked={resolvedTheme === "dark"}
      />
    </>
  );
};

export default Layout;
