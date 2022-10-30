import TinyURL from "tinyurl";
import { MessageEmbed } from "discord.js";

const getCongratsEmbed = (amount, payee) => {
  return new MessageEmbed()
    .setColor("#1689FC")
    .setAuthor("Dispay", "https://i.postimg.cc/Vvk8y6rW/logo.png")
    .setTitle(`**Congratulations!**`)
    .setDescription(
      `You have initiated a payment of **₹${amount}** to user ${payee}`
    )
    .setTimestamp();
};

const getPaymentLinkEmbed = (amount, payee, res) => {
  return new MessageEmbed()
    .setColor("#49CC85")
    .setAuthor("Dispay", "https://i.postimg.cc/Vvk8y6rW/logo.png")
    .setTitle(`**Payment link generated!**`)
    .setThumbnail("https://i.postimg.cc/6p0h4Lng/tick-small.gif")
    .setDescription(
      `Here's your payment link:   [Payment link](${res.short_url})\n\nYour payment details:`
    )
    .addFields(
      { name: `**To:**`, value: `${payee}`, inline: true },
      { name: `**Amount:**`, value: `₹ ${amount}`, inline: true }
    )
    .setTimestamp();
};

const generatingPaymentLinkEmbed = (amount, payee) => {
  return new MessageEmbed()
    .setColor("#f7d03f")
    .setAuthor("Dispay", "https://i.postimg.cc/Vvk8y6rW/logo.png")
    .setTitle(`**Payment process initiated!**`)
    .setDescription(
      `Generating your payment link.\nYou will receive the payment link soon.`
    )
    .setThumbnail("https://i.postimg.cc/Kv4hVdW0/Pulse-1s-40px.gif")
    .addFields(
      { name: `**To:**`, value: `${payee}`, inline: true },
      { name: `**Amount:**`, value: `₹ ${amount}`, inline: true }
    )
    .setTimestamp();
};

const getPaymentCancelEmbed = () => {
  return new MessageEmbed()
    .setColor("#F44336")
    .setAuthor("Dispay", "https://i.postimg.cc/Vvk8y6rW/logo.png")
    .setTitle(`**Payment cancelled!**`)
    .setDescription(`Thank you for using Dispay`)
    .setThumbnail("https://i.postimg.cc/ydTWzZ8H/cancel.png")
    .setTimestamp();
};

const getPayoutLinkEmbed = async (amount, payer, refid) => {
  //first shorten the url then send the embed
  const url = await TinyURL.shorten(`https://anomic30.github.io/Custom-payout-page/?id=${refid}`);
  return new MessageEmbed()
    .setColor("#1689FC")
    .setAuthor("Dispay", "https://i.postimg.cc/Vvk8y6rW/logo.png")
    .setTitle(`**Your payout link**`)
    .setThumbnail("https://i.postimg.cc/6p0h4Lng/tick-small.gif")
    .setDescription(
      `Here's your payout link: ${url}\n\nYour payout details:`
    )
    .addFields(
      { name: `**From:**`, value: `${payer}`, inline: true },
      { name: `**Amount:**`, value: `₹ ${amount}`, inline: true }
    )
    .setTimestamp();
};

const paymentHistoryEmbed = () => {
  return new MessageEmbed()
    .setColor("#1689FC")
    .setAuthor("Dispay", "https://i.postimg.cc/Vvk8y6rW/logo.png")
    .setThumbnail("https://i.postimg.cc/KzhXwjTb/square-logo.png")
    .setTitle(`**Payment history**`)
    .setDescription(
      `Visit our dashboard to see all your payment history\nand get additional insights on your transactions!`
    )
    .setTimestamp();
};

export {
  getCongratsEmbed,
  getPaymentLinkEmbed,
  generatingPaymentLinkEmbed,
  getPaymentCancelEmbed,
  getPayoutLinkEmbed,
  paymentHistoryEmbed,
};
