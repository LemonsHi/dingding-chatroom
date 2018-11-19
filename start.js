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
let index = 0

io.on('connection', function(socket){
  // console.log('a user connection:', socket.id);
  userInfo.push({
    key: index++,
    id: socket.id,
    name: socket.id
  })
  io.emit('login', socket.id);
  // console.log(JSON.stringify(userInfo));
  io.emit('user list', JSON.stringify(userInfo))

  socket.on('disconnect', function(reason){
    console.log(socket.id);
    // 修改
    // let k;
    // for (var i = 0, lenght = userInfo.length; i < lenght; i++) {
    //   if (userInfo[i].id === socket.id) {
    //     k = i;
    //     break;
    //   }
    // }
    // userInfo.slice(k, 1);
    console.log(JSON.stringify(userInfo));
    console.log(userInfo.length);
  });

  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});

// io.on('disconnect', function (socket) {
//   console.log('\n a user connection:', socket.id);
// })

http.listen(port, function(){
  console.log('listening on *:' + port);
});
