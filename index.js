// Importando librerías necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes')

//Creando app de express
const app = express();
const apiPort = process.env.Api_PORT || 3003;

//Preparando/Seteando app de express
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

//Diciendole a la app que awante por nuevas llamadas y duerma cuando nadie llegue
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));