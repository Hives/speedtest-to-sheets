import speedTest, { ResultEvent } from "speedtest-net";

type Result = {
  ok: true,
  payload: ResultEvent
} | {
  ok: false,
  error: unknown
}

export async function runSpeedTest(): Promise<Result> {
  try {
    return {
      ok: true,
      payload: await speedTest()
    }
  } catch (e) {
    return {
      ok: false,
      error: e
    }
  }
}
