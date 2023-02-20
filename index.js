//各モジュール呼び出し
var http = require('http');
const sql = require('mssql/msnodesqlv8');
const express = require("express");
var path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = '5000';

//テンプレート設定
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(express.static("images"));
app.use(express.static('css'));
app.use(express.static('javascript'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB Config
var config = {
    user: 'test',
    password: 'MyMonster',
    server: '172.20.10.3\\SQLEXPRESS,1433', // You can use 'localhost\\instance' to connect to named instance
    database: 'Dev_MyMonster',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection:true
    }
  };
  var event = '';
  var detail = '';
  var image = '';
  //プール作成
  const pool = new sql.ConnectionPool(config);
  module.exports = pool;
  app.get("/b",function(req,res,next){
    return res.render('template3');
})

app.get("/",function(req,res,next){
    return res.render('template2');
})
var imageArray = []; 
app.get("/a",function(req,res,next){
    pool.connect(function(err) {
        if (err) {
        console.log(err);
        res.status(500).send("Error: " + err);
        return;
        }
        // クエリを実行
        pool.request().query('SELECT * FROM Charcter_Data', function(err, result) {
            if (err) {
            console.log(err);
            res.status(500).send("Error: " + err);
            return;
            }
            console.log(result);
            result.recordset.forEach(function(value) {
                console.log(value.Charcter);
                if(value.Charcter == 1)
                {
                    imageArray.push('01_omoshiroi.png')
                }
                else if(value.Charcter == 2)
                {
                    imageArray.push('02_chiteki.png')
                }
                else if(value.Charcter == 3)
                {
                    imageArray.push('03_akarui.png')
                }
                else if(value.Charcter == 4)
                {
                    imageArray.push('04_kyochosei.png')
                }
                else if(value.Charcter == 5)
                {
                    imageArray.push('05_chuibukai.png')
                }
                else if(value.Charcter == 6)
                {
                    imageArray.push('06_kichomen.png')
                }
                else if(value.Charcter == 7)
                {
                    imageArray.push('07_johin.png')
                }
                else if(value.Charcter == 8)
                {
                    imageArray.push('08_ooraka.png')
                }
                else if(value.Charcter == 9)
                {
                    imageArray.push('09_kokishin.png')
                }
                else if(value.Charcter == 10)
                {
                    imageArray.push('10_reisei.png')
                }
                else if(value.Charcter == 11)
                {
                    imageArray.push('11_reigitadashii.png')
                }
                else if(value.Charcter == 12)
                {
                    imageArray.push('12_kodoryoku.png')
                }
                else if(value.Charcter == 13)
                {
                    imageArray.push('13_leadership.png')
                }
                else if(value.Charcter == 14)
                {
                    imageArray.push('14_mendomigaii.png')
                }
                else if(value.Charcter == 15)
                {
                    imageArray.push('15_kikijyozu.png')
                }
                else if(value.Charcter == 16)
                {
                    imageArray.push('16_sunao.png')
                }
                else if(value.Charcter == 17)
                {
                    imageArray.push('17_magime.png')
                }
                else if(value.Charcter == 18)
                {
                    imageArray.push('18_jibunnoiken.png')
                }
                else if(value.Charcter == 19)
                {
                    imageArray.push('19_yasashii.png')
                }
                else if(value.Charcter == 20)
                {
                    imageArray.push('20_knkyo.png')
                }
                else if(value.Charcter == 21)
                {
                    imageArray.push('21_seigikan.png')
                }
            });
            console.log(imageArray);
            return res.render('template1',{items:imageArray});
    });
    });
});
var query1 = 'INSERT INTO Charcter_Data VALUES (1,';
var query2 = 'INSERT INTO Charcter_Data VALUES (2,';
var query3 = 'INSERT INTO Charcter_Data VALUES (3,';
app.post('/', function(req, res) {
    var checkedValues = req.body.values;
    query1 = query1.concat("'" + checkedValues[0].replace(/"/g, "''") + "')");
    query2 = query2.concat("'" + checkedValues[1].replace(/"/g, "''") + "')");
    query3 = query3.concat("'" + checkedValues[2].replace(/"/g, "''") + "')");
      
    var query = query1 + query2 + query3;
    console.log(query);
  pool.connect(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error: " + err);
      return;
    }

    // クエリを実行
    pool.request().query('DELETE FROM Charcter_Data', function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send("Error: " + err);
          return;
        }

    pool.request().query(query1, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send("Error: " + err);
          return;
        }
      
        pool.request().query(query2, function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send("Error: " + err);
            return;
          }
      
          pool.request().query(query3, function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send("Error: " + err);
              return;
            }
      
            console.log(result);
            res.writeHead(301, { Location: "/a" });// ●ここな
            res.end();// ●ここだよ
          });
        });
      });
  });
});
});

var server = http.createServer(app);
server.listen(PORT);