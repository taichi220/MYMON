//各モジュール呼び出し
var http = require('http');
const sql = require('mssql/msnodesqlv8');
const express = require("express");
var path = require('path');
const fs = require('fs');

const app = express();
const PORT = '5000';

//テンプレート設定
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(express.static("images"));
app.use(express.static('css'));
// app.use("css",express.static(path.join(__dirname,'css')));

//connection pool
// const pool = sql.creattpool({

// })
//DB Config
var config = {
    user: 'test',
    password: 'MyMonster',
    server: '172.20.10.3\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
    database: 'Dev_MyMonster',
    driver: 'msnodesqlv8',
    // stream: true, // You can enable streaming globally
    options: {
        trustedConnection:true
    //   encrypt: true // Use this if you're on Windows Azure
    }
  };
  var event = '';
  var detail = '';
var image = '';
  sql.connect(config,function(err){
    if(err){
        console.log(err);
    }
    var request = new sql.Request();
    request.query('SELECT * FROM TalkHistory_1', function(err, recordset) {
        if(err)
        {
        console.log(err);
        }else
        {
            console.log(recordset);
        }
        // var event = recordset.recordset[0].Event
        event = recordset.recordset[0].Event;
        detail = recordset.recordset[0].Detail;
        console.log(event);
        // var div = document.getElementById('wrap');    
        // document.getElementById('wrap').innerHTML = event;
        // console.log(div);
        if(event = '正月                  ')
{
    image = '02_chiteki.png';
    // app.get('/image', (req, res) => {
    //     console.log('image');
    //     fs.readFile('./01_omoshiroi.png', (err, data) => {
    //       res.type('png');
    //       res.send(data);
    //     });
    // });
    // var img = document.getElementById('test');
    // img.setAttribute('src', './01_omoshiroi.png');
}
else
{
    image = '02_chiteki.png';
}
console.log(image);
    });
//DB終わり


app.get("/",function(req,res,next){
    return res.render('template2');
})
app.get("/a",function(req,res,next){
    return res.render('template1',{title:image});

})
var server = http.createServer(app);
// server.listen('5000');
server.listen(PORT);
    // app.get("/", (req, res) => {
    //     // res.send("こんにちは、えくすぷれす。");
    //     res.send(event);
    // });


    // app.listen(PORT,() => console.log("サーバー起動中"));

  })