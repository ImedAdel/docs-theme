const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({
			node,
			getNode,
			basePath: `docs`,
			trailingSlash: false,
		})
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}

exports.createPages = async ({ graphql, actions }) => {
	const pageTemplate = require.resolve(`./src/templates/index.js`)
	const { data } = await graphql(
		`
			{
				allMarkdownRemark {
					nodes {
						fields {
							slug
						}
					}
				}
			}
		`
	)

	data.allMarkdownRemark.nodes.map(({ fields: { slug } }) => {
		actions.createPage({
			path: slug,
			component: pageTemplate,
			context: {
				slug,
			},
		})
	})
}
