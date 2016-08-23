# kik-visualqr-bot
Kik Bot for generating Visual QR codes using http://www.visualead.com API.

# Configuration File

Create an environment specific configuration file in the `config` folder.
The environment is defined by the `NODE_ENV` parameter (i.e., the default is: `config/development.json`).

The configuration file should have the following settings:

```javascript
{
  "bot": {
    "username": "visualeadqr.dev.bot",
    "apiKey": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "baseUrl": "https://leonid.ngrok.io/"
  },
  "visualead": {
    "apiKey": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  }
}
```
