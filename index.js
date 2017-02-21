var TelegramBot = require('node-telegram-bot-api');
var request = require('request')
var token = '155871338:AAHW9dT3kSQdm6wVlViuwqfPktghEMXwyHk';
var bot = new TelegramBot(token, { polling: true });
var cheerio = require('cheerio')
//var Entities = require('html-entities').AllHtmlEntities;
//var entities = new Entities();
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var xhr = new XMLHttpRequest();
//var xml2js = require('xml2js');
//var parser = new xml2js.Parser();
//var = result
//var = body;
//var = result;



  // отправляем сообщение в чат
  bot.on('message', function (msg) {
  var chatId = msg.chat.id;

  //console.log(msg);

  switch (msg.text) {
    case '/start':
      start(chatId);
    break;
    case 'Войти':
      bot.sendMessage(chatId, 'Введите логин');
      start(chatId)
    break;
    case 'Реквизиты':
      bot.sendMessage(chatId, 'Реквизиты компании');
      bot.sendDocument(chatId, 'price.xls');
      //start(chatId)
    break;
    case 'Анекдот':
     //bot.sendMessage(chatId, 'Вы видите кубок!');
     anekdot(chatId);
    break;
    
  }
});
  function anekdot(chatId) {


   //var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
//xhr.open('GET', 'http://rzhunemogu.ru/Rand.aspx?CType=1', false);

// 3. Отсылаем запрос
//xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
//if (xhr.status != 200) {
  // обработать ошибку
 // console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
//} else {
  // вывести результат
  //console.log(xhr.responseText); // responseText -- текст ответа.
//} 
  var url = 'http://www.cbr.ru/scripts/XML_daily.asp?date_req=07/02/2017';
  console.log(url)
  request(url, function(error, response, body) {
  //  console.log("1");
   // parser.parseString(body, function (err, result) {
  
    var $ = cheerio.load(body, {
    normalizeWhitespace: true,
    xmlMode: true
  });
     //var valute = $('Valute').find('NumCode');
    // if(valute.val("826")==true){
    //console.log(result);
    //var data = JSON.parse(body);
    // console.log(entities.decode(result[0]));
    var name =[];
    $('Valute').each(function(i, elem) {
     // var n = $(this).find("Value");
     //console.log($(this).find('CharCode').text())
    if($(this).find('CharCode').text()=="EUR"){ 
    name[i] = $(this).find('Value').text();
  //bot.sendMessage(chatId, name[i]);
  //console.log(name[i])
  bot.sendMessage(chatId, name[i]);
}
});
//  }
  });

  //console.log(data[i])
  //bot.sendMessage(chatId, 'Сумма '+Math.floor(sumdata[i])+' руб.');
//});
 
//bot.sendMessage(chatId, body);

 
  //parser.parseString(body, function (err, result){
   // console.log(result); 
  //});
  //}); 
  //console.log(result); 
}

function start(chatId) {
  bot.sendMessage(chatId, 'Необходимо зарегестрироваться', {
    reply_markup: JSON.stringify({
      keyboard: [
        [{
          text: 'Войти',
          callback_data: '147'
        }],
        [{
          text: 'Реквизиты',
          callback_data: '146'
        }],
        [{
          text: 'Анекдот',
          callback_data: '151'
        }]]
    })
  });

}
