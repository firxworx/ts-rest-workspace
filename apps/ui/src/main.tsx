import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './App'

const mountNode = document.getElementById('root')

if (mountNode) {
  const root = ReactDOM.createRoot(mountNode)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  console.error("React mount point 'root' not found in document.")
}
