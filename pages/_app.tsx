import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github'
import '../styles/index.css'

export default class Site extends App {
  cms: TinaCMS

  constructor(props: any) {
    super(props)
    /**
     * 1. Create the TinaCMS instance
     */
    console.log({baseBranch: process.env.BASE_BRANCH})
    this.cms = new TinaCMS({
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github: new GithubClient({
          proxy: "/api/proxy-github",
          authCallbackRoute: "/api/create-github-access-token",
          clientId: process.env.GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
          baseBranch: process.env.BASE_BRANCH,
        }),
      },
      /**
       * 3. Hide the Sidebar & Toolbar
       *    unless we're in Preview/Edit Mode
       */
      sidebar: {
        hidden: !props.pageProps.preview,
      },
      toolbar: {
        hidden: !props.pageProps.preview,
      },
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      /**
       * 4. Wrap the page Component with the Tina and Github providers
       */
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          editMode={pageProps.preview}
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          error={pageProps.error}
        >
          {/**
           * 5. Add a button for entering Preview/Edit Mode
           */}
          <EditLink editMode={pageProps.preview} />
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname
  })
}

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export interface EditLinkProps {
  editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const github = useGithubEditing()

  return (
    <button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}