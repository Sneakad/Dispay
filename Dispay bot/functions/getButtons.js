import { MessageActionRow, MessageButton } from "discord.js";

const getYesNoButton = () => {
  return new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId("Sure")
        .setEmoji("👍")
        .setLabel("Confirm")
        .setStyle("SUCCESS")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("Cancel")
        .setEmoji("👎")
        .setLabel("Cancel")
        .setStyle("DANGER")
    );
};

export { getYesNoButton };
