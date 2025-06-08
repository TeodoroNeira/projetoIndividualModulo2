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

INSERT INTO cursos (nomeCurso) VALUES
  ('Exatas'),
  ('Humanas'),
  ('Biológicas');

INSERT INTO materias (nomeMateria, cursoId) VALUES
  ('Matemática', 1),
  ('Física', 1),
  ('Química', 1);


INSERT INTO materias (nomeMateria, cursoId) VALUES
  ('História', 2),
  ('Geografia', 2),
  ('Filosofia', 2);


INSERT INTO materias (nomeMateria, cursoId) VALUES
  ('Biologia', 3),
  ('Ecologia', 3),
  ('Genética', 3);