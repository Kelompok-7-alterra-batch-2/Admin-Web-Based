import { NextUIProvider } from '@nextui-org/react'

import { BrowserRouter } from 'react-router-dom';

import { theme } from './themes'

import RouteComponent from './components/RouteComponent';

function App() {
  return (
      <BrowserRouter>
        
        <NextUIProvider theme={theme}>
          {/* put route in this component */}
          <RouteComponent/>    

        </NextUIProvider>
      
      </BrowserRouter>
  );
}

export default App;
