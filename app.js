require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//YOUR CODE HERE
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

const token = process.env.BOT_TOKEN;
const eventsApi = require("@slack/events-api");
const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET);
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});
app.use("/", slackEvents.expressMiddleware());
slackEvents.on("message", async (event) => {
  console.log(event);
});
