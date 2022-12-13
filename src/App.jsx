import React from 'react';
import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar';
import './styles/app.scss';
import {BrowserRouter, Route, Navigate, Routes} from 'react-router-dom';

function App() {
  return (
		<BrowserRouter>
			<div className="app">
				<Routes>
					<Route path='/:id' element={
						<>
							<div className="settings-wrapper">
								<Toolbar/>
								<SettingBar/>
							</div>
							<Canvas/>
						</>
					}/>
					<Route path='*' element={<Navigate to={`f${(+new Date()).toString(16)}`}/>} />
				</Routes>
			</div>
		</BrowserRouter>
  );
}

export default App;
