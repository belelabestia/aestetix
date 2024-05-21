import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true }), tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'aestetix',
      formats: ['es'],
      fileName: 'aestetix'
    }
  }
})

