import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './main/store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={'/webapp'}>
        <ToastProvider>
            <App />
            </ToastProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
reportWebVitals();
