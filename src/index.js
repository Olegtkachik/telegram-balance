require('dotenv').config();
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const adsSdk = require('facebook-nodejs-business-sdk');



// Получаємо баланс
let balance ="";

const accessToken = process.env.FACEBOOK_TOKEN;
const api = adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const account = new AdAccount('act_1230795577093003');




// Функціонал бота
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `
Привіт ${ctx.message.from.first_name}!
Узнай свій залишок на балансі
`,
    Markup.keyboard([
      ['БАЛАНС']
      
    ])
      .resize()
      .extra()
  )
);

bot.help((ctx) => ctx.reply(COUNTRIES_LIST));

bot.on('text', async (ctx) => {
 

  try {
   if(ctx.message.text=="БАЛАНС" || ctx.message.text=="баланс"){
    
        account
  .read([AdAccount.Fields.name, AdAccount.Fields.age,AdAccount.Fields.balance,AdAccount.Fields.currency])
  .then((account) => {
    
      balance = "Ваш баланс: " + (account.balance/100);
       ctx.reply(balance)
  })
  .catch((error) => {
        console.log(error)
});
     
     
     }
  } catch {
    ctx.reply('Помилка');
  }
});
bot.launch();

// eslint-disable-next-line no-console
console.log('Бот запущен');









// function sendTelegramMessage(text) {
//     var CONFIG2 = {
//     TOKEN: '1461874487:AAG2NJ5UNhu48xcFHR5UmlypFKfzTlvTwzc',
//     CHAT_ID: '298935893'
//     };
//     var telegramUrl = 'https://api.telegram.org/bot' + CONFIG2.TOKEN + '/sendMessage?chat_id=' + CONFIG2.CHAT_ID + '&text=';
//     var message = encodeURIComponent(text);
//     var sendMessageUrl = telegramUrl + message;
//     var options = {
//     method: 'POST',
//     contentType: 'application/json'
//     };
    
//     req.post(sendMessageUrl);
    
//     }
