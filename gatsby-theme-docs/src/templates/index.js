/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

const Page = ({ data }) => {
	const windowSizeTracker =
		typeof window !== `undefined` ? window.innerWidth : 960

	const [windowWidth, setWindowWidth] = React.useState(windowSizeTracker)

	React.useEffect(() => {
		setWindowWidth(window.innerWidth)
	}, [window.innerWidth])

	const vw = (multiplier, ww) => (ww / 100) * multiplier
	const tracking = (z, a = -0.0223, b = 0.185, c = -0.1745) =>
		a + b * Math.exp(z * c)

	return (
		<div
			css={{
				flexWrap: 'wrap',
				display: 'flex',
				width: `64vw`,
				margin: `0 auto`,
			}}
		>
			<Global
				styles={css`
					@import url('https://rsms.me/inter/inter.css');
					:root {
						font-size: 1.5vw !important;
						font-family: Inter;
						font-height: 1.48;
						letter-spacing: ${tracking(vw(1.5, windowWidth))}em;
					}
					pre {
						font-size: 1vw;
						letter-spacing: ${tracking(vw(1, windowWidth))}em;
						line-height: 1.2;
					}
					@supports (font-variation-settings: normal) {
						:root {
							font-family: 'Inter var', sans-serif;
						}
					}
				`}
			/>
			<Sidebar>Sidebar</Sidebar>
			<Main>
				<section
					dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
				/>
			</Main>
		</div>
	)
}

export default Page

export const pageQuery = graphql`
	query docsPages($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date
			}
		}
	}
`
