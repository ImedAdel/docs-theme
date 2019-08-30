/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'

const Sidebar = ({ data }) => (
	<div
		css={{
			padding: 0,
			flexGrow: 1,
			flexBasis: 256,
			fontSize: `1.25vw`,
			marginTop: `3vw`,
			marginRight: `3vw`,
			borderRight: `1px solid #efefef`,
		}}
	>
		<nav>
			<Link
				to={`/`}
				css={{
					display: `block`,
					fontSize: `2vw`,
					color: `#000`,
					fontWeight: 700,
					paddingBottom: `1.5vw`,
					textDecoration: `none`,
				}}
			>
				Docs
			</Link>
			{data.allDirectory.nodes.map(({ relativePath }) => {
				return (
					relativePath !== `` && (
						<Link
							to={relativePath}
							css={{
								display: `block`,
								color: `#000`,
								textDecoration: `none`,
							}}
						>
							{relativePath}
						</Link>
					)
				)
			})}
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
