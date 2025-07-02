const axios = require("axios");

const functionUrl = process.argv[2];
const numRequests = 50; // Number of concurrent requests

if (!functionUrl) {
  console.error("Please provide the function URL as a command-line argument.");
  process.exit(1);
}

const sendRequest = async (i) => {
  try {
    // First, store some data
    await axios.post(functionUrl, {
      key: `test_key_${i}`,
      value: `test_value_${i}`,
    });

    // Then, retrieve the data
    const response = await axios.get(functionUrl);

    console.log(
      `Request ${i + 1}: Instance ID = ${
        response.data.instanceId
      }, Data = ${JSON.stringify(response.data.data)}`
    );
  } catch (error) {
    console.error(`Request ${i + 1} failed:`, error.message);
  }
};

const runLoadTest = async () => {
  console.log(
    `Starting load test with ${numRequests} requests to ${functionUrl}...`
  );
  const requests = [];
  for (let i = 0; i < numRequests; i++) {
    requests.push(sendRequest(i));
  }
  await Promise.all(requests);
  console.log("Load test finished.");
};

runLoadTest();
