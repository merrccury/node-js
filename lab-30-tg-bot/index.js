const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '1850992819:AAFj8LdYB40fXDUzeQTxBZSzgff_6kE9y-M';

const bot = new  TelegramBot(TOKEN, { polling: true });
// t.me/messages_handler_bot

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    if (msg.text)
        bot.sendMessage(chatId, `echo: ${msg.text}`);
else
    bot.sendMessage(chatId, `Send a text message`);
});