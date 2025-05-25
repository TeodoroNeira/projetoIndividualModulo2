CREATE TABLE IF NOT EXISTS cursos (
  cursoId SERIAL PRIMARY KEY,
  nomeCurso VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios (
  usuarioId SERIAL PRIMARY KEY,
  nomeUsuario VARCHAR(255) NOT NULL UNIQUE,
  nascimentoUsuario DATE NOT NULL,
  cursoId INT NOT NULL,
  senha VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL UNIQUE,
  FOREIGN KEY (cursoId) REFERENCES cursos(cursoId)
);

CREATE TABLE IF NOT EXISTS materias (
  materiaId SERIAL PRIMARY KEY,
  nomeMateria VARCHAR(255) NOT NULL UNIQUE,
  cursoId INT NOT NULL,
  FOREIGN KEY (cursoId) REFERENCES cursos(cursoId)
);

CREATE TABLE IF NOT EXISTS tarefas (
  tarefaId SERIAL PRIMARY KEY,
  nomeTarefa VARCHAR(255) NOT NULL,
  descricaoTarefa TEXT NOT NULL,
  status VARCHAR(255) NOT NULL, 
  dataInicio DATE NOT NULL,
  dataFim DATE,
  materiaId INT NOT NULL,
  usuarioId INT NOT NULL,
  FOREIGN KEY (materiaId) REFERENCES materias(materiaId),
  FOREIGN KEY (usuarioId) REFERENCES usuarios(usuarioId)
);