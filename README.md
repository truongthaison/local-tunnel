# Local Webhook Testing By TFO-SD

This project sets up a local server using Express and forwards incoming requests to a specified URL using Axios. It also uses LocalTunnel to expose the local server to the internet.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Install the dependencies:

    ```sh
    npm install
    ```

2. Create a `.env` file in the root directory and add the following environment variables:

    ```dotenv
    # Forward message to your application
    FW_TO=https://lineorder.local/hook/line-message

    DEBUG=true

    # Register a new subdomain. Don't change if you don't know what you are doing
    SUBDOMAIN=tfo-sd-local-tunnel
    ```
   ## Environment Variables
| KEY   | Description                                       |
|-------|---------------------------------------------------|
| FW_TO | The URL to forward requests to.                   |
| DEBUG | If set to `true`, logs request headers and body.  |
| SUBDOMAIN | The subdomain for LocalTunnel.                |


## Usage

1. Start the server:

    ```sh
    npm start
    ```

2. The server will open a tunnel and start listening on port 8080. 
You will see the tunnel URL in the console output.
Default is: `https://tfo-sd-local-tunnel.loca.lt`

3. Send a POST request to the tunnel URL to test the webhook forwarding.


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
