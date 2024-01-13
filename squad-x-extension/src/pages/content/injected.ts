import exampleThemeStorage from '@/shared/storages/example-theme-storage'

async function toggleTheme() {
  console.log('initial theme', await exampleThemeStorage.get())
  await exampleThemeStorage.toggle()
  console.log('toggled theme', await exampleThemeStorage.get())
}

void toggleTheme()
