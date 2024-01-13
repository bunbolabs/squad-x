import 'webextension-polyfill'

// import { firebaseConfig } from '@root/src/services/firebase'
// import { initializeApp } from 'firebase/app'
// import { getDatabase } from 'firebase/database'
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script'

reloadOnUpdate('pages/background')

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/styles.css')

console.log('background loaded')

// export const app = initializeApp(firebaseConfig)
// export const database = getDatabase(app)
// // export const auth = getAuth(app)
