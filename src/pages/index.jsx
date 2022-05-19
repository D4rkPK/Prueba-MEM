import Head from 'next/head';
export default function Home() {
  return (
    <div classname="relative bg-white overflow-hidden">
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-3/3 justify-center items-start text-center md:text-center">
            <p className="uppercase tracking-loose w-full">Ministerio de Energia y Minas</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">Prueba de Conocimiento Frontend</h1>
          </div>
          <div className="w-full md:w-6/6 py-6 text-center">
            <img className="max-w-full h-auto rounded-lg" src={"https://mem.gob.gt/wp-content/uploads/2022/04/3a6ab810-0b6b-41c1-a771-8742c6a45037.jpg"} />
          </div>
        </div>
      </div>
    </div>
  );
}
