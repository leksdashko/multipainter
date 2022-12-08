import Tool from "./Tool";

export default class Circle extends Tool {
	constructor(canvas) {
		super(canvas);
		this.listen();
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;
		this.saved = this.canvas.toDataURL();
	}

	mouseMoveHandler(e) {
		if(this.mouseDown) {
			let currentX = e.pageX - e.target.offsetLeft;
			let currentY = e.pageY - e.target.offsetTop;
			let radiusX = Math.abs(this.startX - currentX);
			let radiusY = Math.abs(this.startY - currentY);

			this.draw(this.startX, this.startY, radiusX, radiusY);
		}
	}

	draw(x, y, radiusX, radiusY){
		const img = new Image();
		img.src = this.saved;
		img.onload = () => {
			this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img,0,0,this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI, true);
			this.ctx.fill();
			this.ctx.stroke();
		}
	}
}