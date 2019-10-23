import React from "react"
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import ReactPlayer from 'react-player'

const VidPage = ({data}) => {
  console.log(data)
  return (
    <Layout>
       <Helmet titleTemplate="%s | STW">
            <title>{`${data.markdownRemark.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${data.markdownRemark.frontmatter.description}`}
            />
            <meta property="og:type" content="business.business" />
            <meta property="og:title" content={data.markdownRemark.frontmatter.title} />
            <meta property="og:url" content={data.markdownRemark.frontmatter.url} />
            <meta property="og:image" content={`https://img.youtube.com/vi/${data.markdownRemark.frontmatter.vidId}/hqdefault.jpg`} />

          </Helmet>
      <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10">
            <div className="section">
              <div className="column is-7">
                <ReactPlayer
                  width={"100%"}
                  style={{
                    width: "100%"
                  }}
                  url={data.markdownRemark.frontmatter.url}
                  playing
                  controls />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    </Layout>
  )
}

export default VidPage


export const pageQuery = graphql`
  query VidPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        url
        vidId
        description
        tags
      }
    }
  }
`
