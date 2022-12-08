import { makeAutoObservable } from "mobx";

class CanvasState {
	tool = null;

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas) {
		this.canvas = canvas;
	}
}

export default new CanvasState();