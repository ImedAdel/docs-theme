/** @jsx jsx */
import { jsx } from '@emotion/core'

const Main = ({ children }) => (
	<div
		css={{
			padding: 16,
			flexGrow: 99999,
			flexBasis: 0,
			minWidth: 320,
		}}
	>
		{children}
	</div>
)

export default Main
