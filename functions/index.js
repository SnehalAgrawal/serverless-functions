
const functions = require('@google-cloud/functions-framework');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Generate a unique ID for this function instance
const instanceId = uuidv4().slice(0, 8);
const instanceData = {};

console.log(`Instance ${instanceId} started.`);

app.get('/', (req, res) => {
  res.json({
    instanceId,
    data: instanceData,
  });
});

app.post('/', (req, res) => {
  const { key, value } = req.body;
  if (!key) {
    return res.status(400).send('Missing "key" in request body.');
  }
  instanceData[key] = value;
  res.status(201).json({
    instanceId,
    message: `Key '${key}' stored successfully.`,
    data: instanceData
  });
});

functions.http('inMemoryStore', app);
