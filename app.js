require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const eventsApi = require("@slack/events-api");
const slackEvents = eventsApi.createEventAdapter(
  process.env.SLACK_SIGNING_SECRET
);

const token = process.env.SLACK_BOT_TOKEN;

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});

app.use("/", slackEvents.expressMiddleware());

slackEvents.on("message", async (event) => {
  console.log(event);
  const channel = event.channel;
  if (!event.bot_profile) {
    client.chat.postMessage({ channel, token, text: "Test recieved!" });
  }
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
