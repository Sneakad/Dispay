import {
  getCongratsEmbed,
  getPaymentLinkEmbed,
  generatingPaymentLinkEmbed,
  getPaymentCancelEmbed,
  getPayoutLinkEmbed
} from './getEmbeds.js';
import { getDetailsJSON } from './getJSON.js';
import { getYesNoButton } from './getButtons.js';
import Razorpay from 'razorpay';
import randomize from 'randomatic';
import * as dotenv from 'dotenv';
import axios from 'axios';
import moment from 'moment';

dotenv.config();

const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

const instance = new Razorpay({
  key_id: RAZORPAY_KEY,
  key_secret: RAZORPAY_SECRET,
});

const pay = async (interaction, options) => {
  const payer = await interaction.user;
  const payee = await options.getUser('payee');
  const amount = await options.getNumber('amount');



  await interaction.reply({
    content: 'Payment process started!\nCheck your DM for the details.',
    ephemeral: true,
  });

  const congratsEmbed = getCongratsEmbed(amount, payee);
  await interaction.user.send({
    embeds: [congratsEmbed],
    ephermal: true,
  });

  const choiceBtns = getYesNoButton();
  await interaction.user
    .send({
      content: 'Do you want to proceed?',
      components: [choiceBtns],
    })
    .then(async (msgRef) => {
      const collector =
        interaction.user.dmChannel.createMessageComponentCollector({
          max: 1,
          time: 1800000, //30 minutes
        });

      collector.on('collect', async (msg) => {
        if (msg.customId === 'Sure') {
          console.log('Payment confirmed');
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Payment workflow
          const id = randomize('A0', 5);
          const options = {
            amount: amount * 100,
            currency: 'INR',
            description: '',
            reference_id: id,
            options: {
              checkout: {
                name: "Dispay"
              }
            }
          };

          // Razorpay API call
          await instance.paymentLink.create(options, async (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
            payee.send(
              `You will receive a payment of **₹${amount}** from **${interaction.user.tag}**`
            );

            //Sending payment link to payer
            const paymentLinkEmbed = getPaymentLinkEmbed(amount, payee, res);
            msgRef.edit({
              embeds: [paymentLinkEmbed],
            });

            //Uploading payment details to database
            const paymentDetails = getDetailsJSON(payer, payee, res);
            try {
              await axios.post("https://chatterpay-server-prod.herokuapp.com/upload", paymentDetails).then((res) => {
                console.log(res.data);
              });
            } catch (error) {
              console.log(error.data);
            }

            //Sending payout link to payee when payment is captured
            // const payoutLinkEmbed = await getPayoutLinkEmbed(amount, payer, id);
            await getPayoutLinkEmbed(amount, payer, id).then((payoutLinkEmbed) => {
              payee.send({
                embeds: [payoutLinkEmbed],
              });
            })
          });
        } else {
          console.log('Payment cancelled');
          return;
        }
      });

      collector.on('end', async (collection) => {
        if (collection.first().customId === 'Sure') {
          const genEmbed = generatingPaymentLinkEmbed(amount, payee);
          await msgRef.edit({
            content: '...',
            embeds: [genEmbed],
            components: [],
          });
        } else {
          console.log('Payment cancelled');
          const cancelEmbed = getPaymentCancelEmbed();
          await msgRef.edit({
            content: '...',
            embeds: [cancelEmbed],
            components: [],
          });
        }
      });
    });

  //___________________Checking for payment status by id___________________

  // const paymentLinkId = "plink_Ia6Dsf0tOJxADH"
  // await instance.paymentLink.fetch(paymentLinkId, (err, res) => {
  //     if (err) {
  //         console.log(err);
  //         return;
  //     }
  //     console.log(res);
  // })
  //_________________________________________________________________________
};

export { pay };
