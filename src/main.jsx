import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css';
import './assets/fontawesome/css/all.min.css';
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { BackgroundProvider } from './contexts/BackgroundContext.jsx';
import { LoadingProvider } from './contexts/LoadingContext.jsx';
import { ErrorProvider } from './contexts/ErrorContext.jsx';
import { ControlVisibleProvider } from './contexts/ControlVisibleContext.jsx';
import { OpacityCardProvider } from './contexts/OpacityCardContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BackgroundProvider>
        <ErrorProvider>
          <ControlVisibleProvider>
            <LoadingProvider>
              <OpacityCardProvider>
                <App />
              </OpacityCardProvider>
            </LoadingProvider>
          </ControlVisibleProvider>
        </ErrorProvider>
      </BackgroundProvider>
    </ThemeProvider>
  </StrictMode>
)
