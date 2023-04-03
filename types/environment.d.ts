declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MIFIEL_APP_ID: string
      MIFIEL_APP_SECRET: string
      MIFIEL_ENVIRONMENT: 'production' | 'sandbox'
      NEXT_PUBLIC_MIFIEL_APP_SNIPPET_URL: string
      NEXT_PUBLIC_MIFIEL_API_URL: string
      NEXT_PUBLIC_DOMAIN_URL: string
      GOOGLE_CLOUD_CLIENT_EMAIL: string
      GOOGLE_CLOUD_PRIVATE_KEY: string
      GOOGLE_CLOUD_PROJECT_ID: string
    }
  }
}

export {}
