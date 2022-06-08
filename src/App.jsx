import { ThemeProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import { theme } from './themes'

import RouteComponent from './components/RouteComponent';

function App() {
  return (
      <BrowserRouter>
        
        <ThemeProvider theme={theme}>
          {/* put route in this component */}
          <RouteComponent/>    

        </ThemeProvider>
      
      </BrowserRouter>
  );
}

export default App;
