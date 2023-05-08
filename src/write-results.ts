import { google } from "googleapis";
import { authorize } from "./auth";
import { format } from "date-fns";

const SPREADSHEET_ID = "1e7hyn8mpGkhuVyOCj73Ywv680DMNc1igzeNIjrNig2I";

type Results = {
  download: number;
  upload: number;
  latency: number;
};

export async function writeResults({ download, upload, latency }: Results) {
  const auth = await authorize();

  const service = google.sheets({ version: "v4", auth });

  try {
    const result = await service.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      valueInputOption: "RAW",
      range: "Sheet1!A:C",
      requestBody: {
        majorDimension: "ROWS",
        values: [[getFormattedTime(), download, upload, latency]],
      },
    });
    console.log(`${result.data.updates?.updatedCells} cells appended.`);
  } catch (e) {
    console.log("Something bad happened");
    console.log(e);
  }
}

function getFormattedTime() {
  return format(new Date(), "dd/MM/yyyy HH:mm:ss");
}
