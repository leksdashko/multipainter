import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from '../tools/Brush';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useParams} from 'react-router-dom';
import Rect from '../tools/Rect';

const Canvas = observer(() => {
	const canvasRef = useRef();
	const usernameRef = useRef();
	const [modal, setModal] = useState(true);
	const [username, setUsername] = useState('');
	const params = useParams();
	const sessionId = params.id;

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		axios.get('http://localhost:5000/image?id=' + sessionId).then(res => {
			const img = new Image();
			img.src = res.data;
			img.onload = () => {
				const ctx = canvasRef.current.getContext('2d');
				ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
				ctx.drawImage(img, 0,0,canvasRef.current.width, canvasRef.current.height);
			}
		});
	}, []);

	useEffect(() => {
		if(canvasState.username){
			const socket = new WebSocket(`ws://localhost:5000`);
			canvasState.setSocket(socket);
			canvasState.setSessionId(sessionId);
			toolState.setTool(new Brush(canvasRef.current, socket, sessionId));
			socket.onopen = () => {
				console.log('connection success');
				socket.send(JSON.stringify({
					id: sessionId,
					username: canvasState.username,
					method: "connection"
				}))
			}

			socket.onmessage = (event) => {
				let msg = JSON.parse(event.data);
				switch(msg.method){
					case "connection":
						console.log(`User ${msg.username} connected`);
						break;
					case "draw":
						drawHandler(msg);
						break;
					default: console.log('it is default action');
				}
			}
		}
	}, [sessionId, username]);

	const drawHandler = (msg) => {
		const figure = msg.figure;
		const ctx = canvasRef.current.getContext('2d');

		switch(figure.type) {
			case 'brush':
				Brush.draw(ctx, figure.x, figure.y);
				break;
			case 'rect':
				Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
				break;
			case 'finish':
				ctx.beginPath();
				break;
			default: console.log('default action');
		}
	}

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL());
		axios.post('http://localhost:5000/image?id=' + sessionId, {img: canvasRef.current.toDataURL()})
			.then(res => console.log(res.data));
	}

	const connectionHandler = () => {
		canvasState.setUsername(usernameRef.current.value);
		setUsername(usernameRef.current.value);
		setModal(false);
	}

	return (
		<div className="canvas">
			<Modal show={modal} onHide={() => setModal(false)} animation={false}>
        <Modal.Header>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<input type="text" placeholder='Your name' ref={usernameRef} />
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
			<canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400} />
		</div>
	)
});

export default Canvas