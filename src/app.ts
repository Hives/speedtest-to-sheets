import { runSpeedTest } from "./speed-test";

main();

async function main() {
  const result = await runSpeedTest();

  if (result.ok) {
    console.log("result.payload: ", result.payload);
  }
}
