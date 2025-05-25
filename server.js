const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const routes = require("./routes/index");


// Middlewares

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
// Rotas
app.use("/", routes);
app.use('/api/login', routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
