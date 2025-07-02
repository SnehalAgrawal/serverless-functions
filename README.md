
# Serverless In-Memory Store (Google Cloud Function)

This project demonstrates a simple Google Cloud Function that acts as an in-memory key-value store. It's designed to showcase the stateless and auto-scaling nature of serverless functions.

Each function instance maintains its own in-memory data store and has a unique instance ID. When you send requests, you'll see responses from different instances, each with its own data, which highlights how Google Cloud Functions scales by creating new instances to handle load.

## Project Structure

- `/functions`: Contains the Node.js Google Cloud Function source code.
- `/load-test`: Contains a script to run a load test against the deployed function.
- `README.md`: This file.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (gcloud CLI)

## Setup and Local Testing

1.  **Install Dependencies:**

    Navigate to the `functions` directory and install the required npm packages.

    ```bash
    cd functions
    npm install
    ```

2.  **Run Locally:**

    Using the [Functions Framework](https://github.com/GoogleCloudPlatform/functions-framework-nodejs), you can run the function on your local machine.

    ```bash
    npx @google-cloud/functions-framework --target=inMemoryStore
    ```

    This will start a local server (usually on `http://localhost:8080`).

3.  **Test Locally:**

    You can use `curl` or any API client to test the local function:

    - **Store data:**
      ```bash
      curl -X POST http://localhost:8080 -H "Content-Type: application/json" -d '{"key": "name", "value": "Gemini"}'
      ```

    - **Retrieve data:**
      ```bash
      curl http://localhost:8080
      ```
      You will see a response showing the instance ID and the data you stored.

## Deployment

1.  **Authenticate with gcloud:**
    ```bash
    gcloud auth login
    gcloud config set project YOUR_PROJECT_ID
    ```

2.  **Deploy the function:**

    From the `functions` directory, run the following command:

    ```bash
    gcloud functions deploy inMemoryStore --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
    ```

    This command will deploy the function and provide you with a public URL.

## Load Testing

After deploying, you can simulate traffic to see how the function scales.

1.  **Install Load Test Dependencies:**

    ```bash
    cd ../load-test
    npm install
    ```

2.  **Run the Load Test:**

    Replace `YOUR_FUNCTION_URL` with the URL you received after deployment.

    ```bash
    node load-test.js YOUR_FUNCTION_URL
    ```

    The script will send 50 concurrent requests. You will see responses from different instance IDs, demonstrating that Google Cloud is spinning up new instances to handle the load. You can configure the number of requests in the `load-test.js` file.
