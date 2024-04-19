import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// ffjg
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  // server:{
  //   proxy:{
  //     '/api/':{
  //       // target:`${window.location.origin}`
  //       target:"http://localhost:5414"
  //     }
  //   }
  // }
})
