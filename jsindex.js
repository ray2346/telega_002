const BotTelegram = require('node-telegram-bot-api');
const TOKEN = '1084830404:AAEszzF1u3d8675TSh9qoFKJ_zWdRVADxdk';
const fs = require('fs');
console.log('=======Красава БОТ Запущен======');
const debag = require('./helpers');
const bot = new BotTelegram(TOKEN,{
    polling:{
        interval: 300,
        autoStart : true,
        params :{
            timeout:10
        }}
});

const inline_keyboard=[
    [{
        text: 'Forward ',             //кнопка 1 1 строка
        callback_data: 'forward'
    }, {
        text: 'Replay',              //кнопка 2 1 строка
        callback_data: 'reply'
    }],
    [{
        text: 'Edit',             //кнопка 3 2 строка
        callback_data: 'edit'
    }, {
        text: 'Delete ',             //кнопка 4 2 строка
        callback_data: 'delete'
    }]
]                          // Клавиатура в чате

bot.on('callback_query', (query)=>{    //Обработчик событий

    const   {chat,message_id, text }= query.message
    switch (query.data) {
        case 'forward':
            // куда,откуда,что
            bot.forwardMessage(chat.id, chat.id, message_id)
            break
        case 'reply':
            bot.sendMessage(chat.id,`Отвечаем на сообщение`,{
                reply_to_message_id: message_id
            })
            break
        case 'edit':
            bot.editMessageText(`${text} (edited)`,{
                chat_id:chat.id,
                message_id: message_id,
                reply_markup: {inline_keyboard}
            })
            break
        case 'delete':
            bot.deleteMessage(chat.id, message_id)
            break
    }
    bot.answerCallbackQuery({
        callback_query_id: query.id
    })
})

bot.onText(/\/start/,(msg,[source,match])=>{
    const chatdId = msg.chat.id
    bot.sendMessage(chatdId,'Keyboard',{
        reply_markup: {
            inline_keyboard
        }
    })
})