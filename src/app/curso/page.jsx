import { getCursos } from "@/lib/data";


const CursosPage = async () => {
    const cursos = await getCursos();

  return (
    <div>
      <h1>Cursos</h1>
      {cursos.map((curso) => (
        <div className={curso.id}>
         <h2>{curso.nome}</h2>
         <p>{curso.descricao}</p>
        </div>
      ))}
    </div>
  );
}

export default CursosPage;