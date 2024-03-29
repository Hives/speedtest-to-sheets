# Internet Speedtest to Google Sheets

Run https://www.speedtest.net/ and upload the results to Google Sheets.

## What does it do?

It runs https://www.npmjs.com/package/speedtest-net and then appends the date,
upload speed, download speed and latency to a Google Sheet.

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

Add your own spreadsheet ID in `write-results.ts`. Its the long (44 char) id
number in the url when you view the spreadsheet in a browser.

## To run it

```bash
# to compile:
npm run build
# once compiled, to run:
npm start
# or, to compile and run:
npm run dev
```

## Run it on a schedule via crontab

Edit your crontab with `crontab -e`. Add something like this:

```
0 */2 * * * cd /path/to/internet-speed-tester/ && /path/to/node build/app.js
```
