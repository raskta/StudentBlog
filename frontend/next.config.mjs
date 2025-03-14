import dotenv from "dotenv"
import { fileURLToPath } from "url"
import path from "path"

// Obtém o diretório do arquivo atual
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Carrega o .env da raiz do projeto
dotenv.config({ path: path.resolve(__dirname, "../.env") })

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    API_URL: process.env.API_URL, // Expor a variável no frontend
  },
}

export default nextConfig
