const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsWork.edges.map(({ node: project }) => {
        createPage({
          path: `projects/${project.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: project.slug,
          },
        })
      })
      resolve()
    })
  })
}
