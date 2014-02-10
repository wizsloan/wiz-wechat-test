var express = require("express");
var logfmt = require("logfmt");
var app = express();
var wechat = require('wechat');

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
app.use('/wechat', wechat('896837C622AFCF1817FDD4BC167D4', function (req, res, next) {
    console.log("123");
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
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
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));

