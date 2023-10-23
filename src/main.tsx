import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DisplayProvider } from './providers/DisplayProvider/index.tsx'
import { FlashDisplayProvider } from './providers/FlashDisplayProvider/index.tsx'
import { AudioProvider } from './providers/AudioProvider/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DisplayProvider>
      <AudioProvider>
        <FlashDisplayProvider>
          <App />
        </FlashDisplayProvider>
      </AudioProvider>
    </DisplayProvider>
  </React.StrictMode>,
)
