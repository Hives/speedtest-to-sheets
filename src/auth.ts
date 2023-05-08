import { google, oauth2_v2 } from "googleapis";
import { AuthClient, BaseExternalAccountClient, OAuth2Client } from "google-auth-library";
import { authenticate } from "@google-cloud/local-auth";
import path from "path";
import fs from "fs";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import Oauth2 = oauth2_v2.Oauth2;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'secrets/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'secrets/credentials.json');

export async function authorize(): Promise<OAuth2Client> {
  const clientFromSavedCredentials = await loadSavedCredentialsIfExist();
  if (clientFromSavedCredentials) {
    return clientFromSavedCredentials as any;
  }

  const client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFileSync(TOKEN_PATH, 'utf-8');
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: OAuth2Client) {
  const content = await fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFileSync(TOKEN_PATH, payload);
}
