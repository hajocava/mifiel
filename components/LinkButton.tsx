import Link from 'next/link'

interface LinkButtonProps {
  children: React.ReactNode | React.ReactNode[]
  href: string
}

export const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="grid w-full place-content-center rounded-lg bg-[#4b56d7] p-4 text-lg font-medium text-white lg:w-[200px]"
    >
      {children}
    </Link>
  )
}

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[]
  onClick: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-[#4b56d7] p-4 text-lg font-medium text-white"
    >
      {children}
    </button>
  )
}
