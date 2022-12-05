import React from 'react';
import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar';
import './styles/app.scss';

function App() {
  return (
    <div className="app">
      <div className="settings-wrapper">
				<Toolbar/>
				<SettingBar/>
			</div>
			<Canvas/>
    </div>
  );
}

export default App;
