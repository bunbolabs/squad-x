/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { defineConfig } from 'vite'

import addHmr from './utils/plugins/add-hmr'
import customDynamicImport from './utils/plugins/custom-dynamic-import'
import makeManifest from './utils/plugins/make-manifest'
import watchRebuild from './utils/plugins/watch-rebuild'

const rootDir = resolve(__dirname)
const srcDir = resolve(rootDir, 'src')
const pagesDir = resolve(srcDir, 'pages')
const sharedDir = resolve(srcDir, 'shared')
const assetsDir = resolve(srcDir, 'assets')
const componentsDir = resolve(sharedDir, 'components')
const hooksDir = resolve(sharedDir, 'hooks')
const storesDir = resolve(sharedDir, 'stores')
const typesDir = resolve(sharedDir, 'types')
const servicesDir = resolve(sharedDir, 'services')
const featuresDir = resolve(sharedDir, 'features')
const outDir = resolve(rootDir, 'dist')
const publicDir = resolve(rootDir, 'public')

const isDev = process.env.__DEV__ === 'true'
const isProduction = !isDev

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = true
const cacheInvalidationKeyRef = { current: generateKey() }

export default defineConfig({
  resolve: {
    alias: {
      '@/': rootDir,
      '@/pages': pagesDir,
      '@/components': componentsDir,
      '@/hooks': hooksDir,
      '@/stores': storesDir,
      '@/types': typesDir,
      '@/shared': sharedDir,
      '@/services': servicesDir,
      '@/features': featuresDir,
      '@/assets': assetsDir,
    },
  },
  plugins: [
    makeManifest({
      getCacheInvalidationKey,
    }),
    react(),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true }),
    isDev && watchRebuild({ afterWriteBundle: regenerateCacheInvalidationKey }),
  ],
  publicDir,
  build: {
    outDir,
    /** Can slow down build speed. */
    // sourcemap: isDev,
    minify: isProduction,
    modulePreload: false,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    rollupOptions: {
      input: {
        content: resolve(pagesDir, 'content', 'index.ts'),
        background: resolve(pagesDir, 'background', 'index.ts'),
        contentStyle: resolve(pagesDir, 'content', 'styles.css'),
        auth: resolve(pagesDir, 'auth', 'index.html'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
        options: resolve(pagesDir, 'options', 'index.html'),
      },
      output: {
        entryFileNames: 'src/pages/[name]/index.js',
        // entryFileNames: fileName => {
        //   const { name } = path.parse(fileName.name)

        //   if (name === 'auth') {
        //     return `${name}/index.js`
        //   }

        //   return `src/pages/${name}/index.js`
        // },
        chunkFileNames: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[hash].js',

        assetFileNames: assetInfo => {
          const { name } = path.parse(assetInfo.name)
          const assetFileName = name === 'contentStyle' ? `${name}${getCacheInvalidationKey()}` : name

          return `assets/[ext]/${assetFileName}.chunk.[ext]`
        },
      },
    },
  },
})

function getCacheInvalidationKey() {
  return cacheInvalidationKeyRef.current
}
function regenerateCacheInvalidationKey() {
  cacheInvalidationKeyRef.current = generateKey()

  return cacheInvalidationKeyRef
}

function generateKey(): string {
  return `${Date.now().toFixed()}`
}
