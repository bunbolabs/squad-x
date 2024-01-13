import { createRoot } from 'react-dom/client'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'

import App from '@/pages/content/ui/app'

import injectedStyle from './injected.css?inline'

refreshOnUpdate('pages/content')

const root = document.createElement('div')

root.id = 'dino-hustle-content-view-root'

document.body.append(root)

const rootIntoShadow = document.createElement('div')

rootIntoShadow.id = 'shadow-root'

const shadowRoot = root.attachShadow({ mode: 'open' })

shadowRoot.appendChild(rootIntoShadow)

/** Inject styles into shadow dom */
const styleElement = document.createElement('style')

styleElement.innerHTML = injectedStyle
shadowRoot.appendChild(styleElement)

createRoot(rootIntoShadow).render(<App />)
