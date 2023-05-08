# Internet Speedtest to Google Sheets

Run https://www.speedtest.net/ and upload the results to Google Sheets.

## Installation

```bash
npm ci
```

You'll need to create an OAuth2 Client ID to access the Sheets API. Follow the
instructions here: https://developers.google.com/sheets/api/quickstart/nodejs

Rename the downloaded JSON to `credentials.json` and place in the `secrets/`
folder. The first time you run the script it will take you through the process
of logging in in a browser, then it will save an access token in the `secrets/`
folder.

## To run it

```bash
# to compile:
npm run build
# once compiled, to run:
npm start
# or, to compile and run:
npm run dev
```

## Run it via crontab

Edit your crontab with `crontab -e`. Add something like this:

```
0 */2 * * * cd /path/to/internet-speed-tester/ && /path/to/node build/app.js
```
