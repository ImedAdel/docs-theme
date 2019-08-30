/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core'
import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

const Page = ({ data }) => {
	const windowSizeTracker =
		typeof window !== `undefined` ? window.innerWidth : 960

	const [windowWidth, setWindowWidth] = React.useState(windowSizeTracker)

	React.useEffect(() => {
		setWindowWidth(windowSizeTracker)
	}, [windowSizeTracker])

	const vw = (multiplier, ww) => (ww / 100) * multiplier
	const tracking = (z, a = -0.0223, b = 0.185, c = -0.1745) =>
		a + b * Math.exp(z * c)

	return (
		<div
			css={{
				flexWrap: 'wrap',
				display: 'flex',
				width: `90vw`,
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
					@supports (font-variation-settings: normal) {
						:root {
							font-family: 'Inter var', sans-serif;
						}
					}
					pre {
						font-family: monospace;
						font-size: 1vw;
						letter-spacing: normal;
						line-height: 1.2;
						background-color: #f6f6f6;
						padding: 1vw 1.5vw;
					}
					:not(pre) > code {
						background-color: #f6f6f6;
						padding: 0.125vw 0.25vw;
					}
					h1 {
						font-size: 4vw;
						font-weight: 900;
						letter-spacing: ${tracking(vw(4, windowWidth))}em;
					}
					h2 {
						font-size: 2.5vw;
						font-weight: 700;
						letter-spacing: ${tracking(vw(2.5, windowWidth))}em;
						padding-top: 1vw;
					}
					h3 {
						font-size: 2vw;
						font-weight: 700;
						letter-spacing: ${tracking(vw(2, windowWidth))}em;
						padding-top: 0.75vw;
					}
					h4 {
						font-size: 1.5vw;
						font-weight: 700;
						letter-spacing: ${tracking(vw(1.5, windowWidth))}em;
						padding-top: 0.5vw;
					}
					h5 {
						font-size: 1.25vw;
						font-weight: 600;
						letter-spacing: ${tracking(vw(1.25, windowWidth))}em;
						padding-top: 0.25vw;
					}
					h6 {
						font-size: 1.125vw;
						font-weight: 600;
						letter-spacing: ${tracking(vw(1.125, windowWidth))}em;
						padding-top: 0.125vw;
					}
					blockquote:first-of-type {
						font-size: 3vw;
						font-weight: 200;
						letter-spacing: ${tracking(vw(3, windowWidth))}em;
					}
					img {
						max-width: 100%;
					}
				`}
			/>
			<Helmet>
				<title>{data.markdownRemark.frontmatter.title}</title>
			</Helmet>
			<Sidebar />
			<Main>
				<h1>{data.markdownRemark.frontmatter.title}</h1>
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
