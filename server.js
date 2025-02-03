require('dotenv').config();
const localtunnel = require('localtunnel');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 8080;
const fwTo = process.env.FW_TO;

// Disable SSL certificate verification (not recommended)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

(async () => {
    console.log('Opening tunnel...');
    const tunnel = await localtunnel({ port: port, subdomain: process.env.SUBDOMAIN });
    console.log('Tunnel opened:', tunnel.url);

    handleRequest();

    tunnel.on('close', () => {
        console.log('Tunnel closed');
    });
})();

/**
 * Sets up the Express server to handle incoming requests.
 */
function handleRequest() {
    const app = express();
    app.use(bodyParser.json());

    app.post('/', async (req, res) => {
        if (process.env.DEBUG) {
            console.log(JSON.stringify(req.headers));
            console.log(req.body);
        }

        await forwardRequest(req.body);
        res.send('OK');
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

/**
 * Forwards the request body to the specified URL.
 * @param {Object} body - The request body to forward.
 */
async function forwardRequest(body) {
    if (!fwTo) {
        // console.error('FW_TO environment variable is not set');
        return;
    }

    try {
        const response = await axios.post(fwTo, body);
        console.log('Forwarded request successfully:', response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
    }
}
