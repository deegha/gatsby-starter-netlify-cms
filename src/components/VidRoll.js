import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import "./vids.scss"

class VidRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    console.log(posts)
    return (
      <div className="videoWrapper">
        <ul>
        { posts && posts.map(({ node: post }) => (
          <li  key={post.fields.slug}>
             <Link to={post.fields.slug}>
              <img src={`https://img.youtube.com/vi/${post.frontmatter.vidId}/hqdefault.jpg`} />
              <h3>{post.frontmatter.title}</h3>
             </Link>
          </li>
        ))}
        </ul>
      </div>
    )
  }
}

VidRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query VidRollQuery{
        allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { frontmatter: { templateKey: { eq: "vid" } } }
              ) {
          edges{
            node{
              fields{
                slug,
              }
              frontmatter{
                title,
                url,
                tags,
                vidId
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <VidRoll data={data} count={count} />}
  />
)
