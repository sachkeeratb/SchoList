// The default css
import './index.css';

// Import the needed React components
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the app
import App from './App.jsx';

// To lead everything to the app
import { BrowserRouter as Router } from 'react-router-dom';

// Create a root and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>
);
