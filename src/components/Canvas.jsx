import { observer } from 'mobx-react-lite';
import React from 'react';
import '../styles/canvas.scss';

const Canvas = observer(() => {
	return (
		<div className="canvas">
			<canvas width={600} height={400} />
		</div>
	)
});

export default Canvas