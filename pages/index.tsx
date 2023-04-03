import { Layout } from 'components/Layout'
import Image from 'next/image'
import doctorImg from 'assets/doctor.png'
import { LinkButton } from 'components/LinkButton'

export default function homePage() {
  return (
    <Layout title="Seguro de gastos medicos mayores">
      <div className="mx-auto flex flex-col gap-4 lg:container md:h-screen md:items-center lg:flex-row lg:gap-8">
        <div className="center flex h-fit w-full items-center justify-center bg-[#4b56d7] lg:order-2 lg:rounded-3xl">
          <Image src={doctorImg} alt="" />
        </div>
        <div className="container flex max-w-4xl flex-col gap-4 px-4 md:gap-8">
          <h1 className="text-3xl font-bold sm:text-[3rem] sm:leading-[3.5rem]">
            Cuida tu bienestar con el seguro médico que necesitas
          </h1>
          <p className="mb-4 text-base font-medium text-slate-500 sm:text-xl">
            Obtén seguro médico completo sin preocuparte por costos mayores.
            Cuida de ti y tu familia. Contrata ahora con tu e.firma del SAT.
          </p>
          <div className="absolute left-0 bottom-4 w-full p-4 lg:relative lg:p-0">
            <LinkButton href="/contratar">Contratar</LinkButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}
