const express = require("express");
const router = express.Router();

// Exemplo de rota inicial
router.get("/", (req, res) => {
  res.send("Teste da página inicial - Ponderada de computação 1");
});

module.exports = router;
