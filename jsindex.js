const BotTelegram = require('node-telegram-bot-api')
const TOKEN = '1084830404:AAEszzF1u3d8675TSh9qoFKJ_zWdRVADxdk'
console.log('=======Красава БОТ Запущен======')
const debag = require('./helpers')
const bot = new BotTelegram(TOKEN,{
    polling:{
        interval: 300,
        autoStart : true,
        params :{
            timeout:10
        }}
});



bot.on('message',(msg) => {
    const html =`<strong>
<b> Hello, ${msg.from.first_name} </b>
<i> Test message</i>
<pre>${debag(msg)} </pre>
</strong>`

    bot.sendMessage(msg.chat.id,html,{
        parse_mode: 'HTML'
    })
})
