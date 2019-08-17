/** @jsx jsx */
import { jsx } from '@emotion/core'

const Sidebar = ({ children }) => (
	<div
		css={{
			padding: 16,
			flexGrow: 1,
			flexBasis: 256,
		}}
	>
		{children}
	</div>
)

export default Sidebar
