import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const normalizeBase = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return '/'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const ghPagesBase =
    repository && !repository.endsWith('.github.io') ? `/${repository}/` : '/'
  const configuredBase = env.VITE_BASE_URL || ghPagesBase

  return {
    plugins: [vue(), tailwindcss()],
    base: normalizeBase(configuredBase),
  }
})
