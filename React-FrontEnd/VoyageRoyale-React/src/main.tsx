import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import {store} from './store/configureStore.ts'
import "toastr/build/toastr.css"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
<BrowserRouter>
  <CssBaseline />
    <App />
  </BrowserRouter>
  </Provider>
  
)
