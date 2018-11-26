var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/css/*.css', function(req, res){
  res.sendFile(`${__dirname}/dist/css/${req.params[0]}.css`);
});
app.get('/js/*.js', function(req, res){
  res.sendFile(`${__dirname}/dist/js/${req.params[0]}.js`);
});

let userInfo = []
let msgDataBase = []
let index = 0
let msgID = 0
let _name = 0

io.on('connection', function(socket){
  // 用户信息列表
  userInfo.push({
    key: index++,
    id: socket.id,
    name: `第 ${_name++} 号用户`,
    info: 'Personal status',
    state: 1
  })

  // 用户连接，代表登入，将唯一标识符 socket id 发给用户用来
  // 目前存在的问题：唯一标识符 id 存在问题，不能以 socket.id 作为唯一标识符 - 需要优化
  socket.emit('login', socket.id);

  // 每当一个用户连接服务，触发 user list 事件，告知所有用户 - 目前有多少用户连接这个服务器
  io.emit('user list', JSON.stringify(userInfo));

  // 用户断开连接时，触发事件
  socket.on('disconnect', function(reason){
    userInfo = userInfo.filter((user) => {
      return user.id !== socket.id;
    })
    io.emit('user list', JSON.stringify(userInfo));
  });

  socket.on('chat message', function(msg){
    console.log(msg);

    let needReadID = [];
    userInfo.forEach((user, index) => {
      needReadID.push(user.id);
    })

    let msgStr = {
      msgID: msgID++,
      id: socket.id,
      content: msg
    }

    let msgInfo = {
      msgID: msgStr.msgID,
      id: socket.id,
      needReadID: needReadID,
      readed: []
    }

    msgDataBase.push(msgInfo)

    // 消息状态信息发送
    io.emit('msgState', JSON.stringify(msgDataBase));
    io.emit('chat message', JSON.stringify(msgStr));
  });

  socket.on('msgReaded', function (state) {
    console.log(`${socket.id} is: ${state}`);
    if (state && msgDataBase.length !== 0) {
      msgDataBase.forEach((msgInfo) => {
        // msgInfo.readed.push(socket.id)
        if (msgInfo.id !== socket.id) {
          msgInfo.needReadID = msgInfo.needReadID.filter((read) => {
            return read !== socket.id
          })
        }
        console.log(msgInfo.needReadID);
      })
      // 消息状态信息发送
      io.emit('msgState', JSON.stringify(msgDataBase));
    }
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
