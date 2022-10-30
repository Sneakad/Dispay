import Discord from "discord.js";
import * as dotenv from "dotenv";
import { pay } from "./functions/pay.js";
import { initializeCommands } from "./commands.js";
import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

const TOKEN = process.env.TOKEN;

const client = new Discord.Client({
  intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES"],
  partials: ["MESSAGE", "CHANNEL"],
});

client.on("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}\n`);

  const GUILD_ID = ""; //Currently using my own server ID for testing
  const guild = client.guilds.cache.get(GUILD_ID);
  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  //Function to initialize all the slash commands
  initializeCommands(commands, Discord);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName, options } = interaction;
  //check for different commands
  if (commandName === "pay") {
    pay(interaction, options);
  } else {
    return;
  }
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Discord bot is running on port: "+process.env.PORT || 8080);
})
client.login(TOKEN);