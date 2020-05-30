import * as React from "react";
import Head from "next/head";
import styled from 'styled-components'

import Navbar from "./Navbar";
import AppFooter from './Footer';

type Props = {
  title?: string;
};

const Body = styled.body`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`
const Main = styled.main`
flex: 1;
`

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
}) => (
  <>
  <Head>
      <title>{`${title} | Logan's Blog`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Body className='bg-body text-body font-body container mx-auto px-4'>
    {/* <div className="bg-body text-body font-body container mx-auto px-4"> */}
      <header>
        <Navbar />
      </header>
      <Main>
      {children}
      </Main>
      <AppFooter/>
    {/* </div> */}
  </Body>
  </>
);


export default Layout;
