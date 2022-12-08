import Brush from "./Brush";

export default class Eraser extends Brush {
	draw(x, y) {
		this.ctx.strokeStyle = 'white';
		super.draw(x,y);
		// this.ctx.lineTo(x,y);
		// this.ctx.stroke();
	}
}