import './index.css'

import { createRoot } from 'react-dom/client'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'

import Popup from './popup'

// process.env.__DEV__ === 'true' && refreshOnUpdate('pages/popup')
refreshOnUpdate('pages/popup')

function init() {
  const appContainer = document.querySelector('#app-container')

  if (!appContainer) {
    throw new Error('Can not find #app-container')
  }
  const root = createRoot(appContainer)

  root.render(<Popup />)
}

init()
