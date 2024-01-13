import packageJson from './package.json' assert { type: 'json' }

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: 'SquadX',
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['storage', 'identity', 'tabs'],
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
  externally_connectable: {
    matches: ['<all_urls>'],
  },
  oauth2: {
    client_id: '309275893654-q01tdbcfi3opbipi5urvbfml1hj6ck90.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/userinfo.email'],
  },
}

export default manifest
