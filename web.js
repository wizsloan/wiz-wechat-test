var express = require("express");
var logfmt = require("logfmt");
var app = express();
var wechat = require('wechat');
var API = require('wechat').API;
var api = new API('wx0c290490b55a89ae', '6bc3061ab55539923c89bc24187b737b');
var menu = {
             "button":[
               {  
                 "type":"click",
                 "name":"今日歌曲",
                 "key":"V1001_TODAY_MUSIC"
               },
               {
                 "name":"菜单",
                 "sub_button":[
                   {  
                     "type":"view",
                     "name":"搜索",
                     "url":"http://www.soso.com/"
                   },
                   {
                     "type":"click",
                     "name":"赞一下我们",
                     "key":"V1001_GOOD"
                   }]
                 }]
               };

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});


var port = 3001;
// var port = Number(process.env.PORT || 3001);
app.listen(port, function() {
  console.log("Listening on " + port);
});


app.use(express.query());
api.getMenu(function (err, result) {
  console.log("get Menu 200");
  console.log(err);
  console.log(result);
  if (result != menu) {
    api.createMenu(menu, function(){console.log("create Menu 200")});
  }
});

// app.use('/weixin', wechat('896837C622AFCF1817FDD4BC167D4', function (req, res, next) {
//     console.log("123");
//   // 微信输入信息都在req.weixin上
//   var message = req.weixin;
//   if (message.Content === 'diaosi') {
//     // 回复屌丝(普通回复)
//     res.reply('hehe');
//   } else if (message.Content === '在吗') {
//     //你也可以这样回复text类型的信息
//     res.reply({
//       content: '刚刚在洗澡。',
//       type: 'text'
//     });
//   } else if (message.Content === 'hehe') {
//     // 回复一段音乐
//     res.reply({
//       type: "music",
//       content: {
//         title: "来段音乐吧",
//         description: "一无所有",
//         musicUrl: "http://mp3.com/xx.mp3",
//         hqMusicUrl: "http://mp3.com/xx.mp3"
//       }
//     });
//   } else {
//     // 回复高富帅(图文回复)
//     res.reply([
//       {
//         title: '你来我家接我吧',
//         description: '这是女神与高富帅之间的对话',
//         picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
//         url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0c290490b55a89ae&redirect_uri=http%3A%2F%2Fwww.wiz.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
//       }
//     ]);
//   }
// }));

app.use('/wechat', wechat('896837C622AFCF1817FDD4BC167D4').text(function (message, req, res, next) {
  // TODO
  console.log("123");
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.Content === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.Content === '在吗') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: '刚刚在洗澡。',
      type: 'text'
    });
  } else if (message.Content === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0c290490b55a89ae&redirect_uri=http%3A%2F%2Fwww.wiz.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
    ]);
  }
}).image(function (message, req, res, next) {
  // TODO
  console.log("image message");
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
  // TODO
}).middlewarify());