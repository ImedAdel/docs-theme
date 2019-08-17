/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { StaticQuery, Link } from 'gatsby'

const Sidebar = ({ data }) => (
	<div
		css={{
			padding: 0,
			flexGrow: 1,
			flexBasis: 256,
			fontSize: `1.25vw`,
		}}
	>
		<nav>
			{data.allDirectory.nodes.map(({ relativePath }) => (
				<Link
					to={relativePath}
					css={{
						display: `block`,
					}}
				>
					{relativePath}
				</Link>
			))}
		</nav>
	</div>
)

const sidebarQuery = graphql`
	{
		allDirectory(sort: { fields: relativePath, order: ASC }) {
			nodes {
				relativePath
			}
		}
	}
`

const StaticSidebar = () => (
	<StaticQuery query={sidebarQuery} render={data => <Sidebar data={data} />} />
)

export default StaticSidebar
