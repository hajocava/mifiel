import Head from 'next/head'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  title: string
}

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  )
}
