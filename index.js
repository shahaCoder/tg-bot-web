const TelegramBot = require('node-telegram-bot-api');
const token = '5842657859:AAFo30USBQuFdH4h8_AN-LyBbndh4duoOZg'
const bot = new TelegramBot(token, {polling: true});
const Appurl = 'https://quiet-alfajores-89a89f.netlify.app/'


bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const text = msg.text
  if(text === '/start'){
      await bot.sendMessage(chatId, 'Добро пожаловать в нашего бота по продаже электронок! \nНаши электронки держатся дольше ваших отношений 😏💔\n\n⬛️ Широкий выбор вкусов\n⬛️ Дымность\n⬛️ Лучшая вкусопередача\n\nНажмите продолжить если вы достигли совершеннолетия (18+)👇', {
        reply_markup: JSON.stringify({
          inline_keyboard: [
                [{text: 'Подтвердить', callback_data: 'Подтвердить'}],
                [{text: 'Контакты', callback_data: 'Контакты'}]
            ]
        })
      });   
    } 
  });

  bot.on('callback_query', msg => {
  const data = msg.data
  const chatId = msg.message.chat.id
  if(data == 'Подтвердить'){
    return bot.sendMessage(chatId, 'Привет,чтобы купить товар,воспользуйтесь\nкнопкой ниже👇', {
    reply_markup: { 
      resize_keyboard: true,
            keyboard: [
                [{text: 'Товары', web_app: {url: Appurl}}]
            ]
        }
    })
  }
  if(data === 'Контакты'){
    bot.sendMessage(chatId, 'Контакты\n89141069216 - Кирилл\n89142952274 - Богдан')
  }
})

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  if(msg?.web_app_data?.data){
    try {
     const data = JSON.parse(msg?.web_app_data?.data)
     const chatId2 = '-1001772500285'
     if(data?.orderType2 == 'Картой'){
      bot.sendMessage(chatId2, 
        'Новый заказ 🆕\nИмя товара: ' + data?.name + '\nТип доставки: ' + data?.orderType + '\nТип оплаты: ' + data?.orderType2 + '\nАдрес доставки: ' + data?.adress2 + '\nВкус: ' + data?.tasteValue + '\nПокупатель: @' + msg.chat.username)
         bot.sendMessage(chatId, 'Ваш заказ в процессе ♻️\nИмя товара: ' + data?.name + '\nЦена: ' + data?.price + '\nКарта для оплаты товара: 4274320059141310\nБогдан Денисович Л\nПроизведите оплату по указанным реквизитам,после этого подтвердите оплату товара 👇🏻', {
          reply_markup: {
            inline_keyboard: [
                  [{text: 'Подтвердить', callback_data: 'Подтверждено'}],
              ]
          }
         })
     } else {
      bot.sendMessage(chatId2, 
        'Новый заказ 🆕\nИмя товара: ' + data?.name + '\nТип доставки: ' + data?.orderType + '\nТип оплаты: ' + data?.orderType2 + '\nАдрес доставки: ' + data?.adress2 + '\nВкус: ' + data?.tasteValue + '\nПокупатель: @' + msg.chat.username)
         bot.sendMessage(chatId, 'Ваш заказ в процессе ♻️\nИмя товара: ' + data?.name + '\nЦена: ' + data?.price, {
         })
     }
      } catch(e){
        console.log(e);
      }
    }
  })
  bot.on('callback_query', async(msg) => {
    const data2 = msg.data
    const chatId = msg.message.chat.id
    const chatId2 = '-1001772500285'
   if(data2 == 'Подтверждено'){
       await bot.sendMessage(chatId2, 'Оплата товара подтверждена!\nПокупатель: @' + msg.from.username)
       await bot.sendMessage(chatId, 'Благодарим вас за покупку,в скором времени с вами свяжутся! \n Обратная связь: @kirrill014' )
   }
 })
 bot.on("polling_error", console.log);