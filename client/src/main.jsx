// The default css
import './index.css';

// Import the needed React components
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the app
import App from './App.jsx';

// To lead everything to the app
import { BrowserRouter as Router } from 'react-router-dom';

// For queries and mutations
import { QueryClient, QueryClientProvider } from 'react-query';

// To provide the website with context
import UpdateContext from '../context/UpdateContext.jsx';

// Create a query client for queries and mutations
const queryClient = new QueryClient();

// Create a root and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<UpdateContext>
					<App />
				</UpdateContext>
			</QueryClientProvider>
		</Router>
	</React.StrictMode>
);
