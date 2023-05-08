import { writeResults } from "./write-results";
import speedTest from "speedtest-net";

async function main() {
  const result = await speedTest();

  console.log(result);

  await writeResults({
    download: result.download.bytes,
    upload: result.upload.bytes,
    latency: result.ping.latency
  });
}

main();

