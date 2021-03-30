var mysql = require('mysql');
var express = require('express');
var app = express();
var port = 8090;
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('img'))

app.get('/', function(req, res){
  return res.send({error:true, message: 'hello'})
})
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saophaixoan1zz",
    database: "HuongDanNauAn1"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
  });
//Tài Khoản
app.get('/taikhoan', function(req, res){
  con.query('select * from Users', function (error, results) {
    if (error) throw error;
    return res.send(results);
  })
})
// Top 5 Món Ăn Yêu Thích Nhất
app.get('/top5',(req,res)=>{
  try{
      var sql ="SELECT * from MonAn  ORDER BY DiemTB Limit 5";
      con.query(sql, function(err, results){
          if (err) throw err;
          res.json({res:results});
      })
  } catch(error){
      console.log(error,"err");
  }
});
// Tất Cả Món Ăn
app.get('/monan', function(req, res){
  con.query('select * from MonAn',function(error, results){
    if(error) throw error;
    return res.send({data:results})
  })
 })
// Món Ăn Việt Nam
app.get('/monanVietNam', function(req, res){
 con.query('select MaMonAn,TenMonAn, AnhDaiDien from MonAn where QuocGia="Việt Nam"',function(error, results){
   if(error) throw error;
   return res.send({data:results})
 })
})
// Món Ăn Nhật Bản
app.get('/monanNhatBan', function(req, res){
  con.query('select MaMonAn,TenMonAn, AnhDaiDien from MonAn where QuocGia="Nhật Bản"',function(error, results){
    if(error) throw error;
    return res.send({data:results})
  })
 })
// Món Ăn Hàn Quốc
 app.get('/monanHanQuoc', function(req, res){
  con.query('select MaMonAn,TenMonAn, AnhDaiDien from MonAn where QuocGia="Hàn Quốc"',function(error, results){
    if(error) throw error;
    return res.send({data:results})
  })
 })
// Món Ăn Trung Quốc
 app.get('/monanTrungQuoc', function(req, res){
  con.query('select MaMonAn,TenMonAn, AnhDaiDien from MonAn where QuocGia="Trung Quốc"',function(error, results){
    if(error) throw error;
    return res.send({data:results})
  })
 })
// Đăng Ký
app.post('/dangki',(req,res)=>{
  try {
      var md5 = require('md5');   
      var username = req.body.TaiKhoan;
      var password = md5(req.body.MatKhau);
      // var loaitaikhoan = req.body.LoaiTaiKhoan;
      var sql=`call ThemTaiKhoan ('${username}','${password}',2)`;
      con.query(sql, function(err, results){
          if (err) throw err;
          res.json("Thành Công");
      })
  } catch (error) {
      res.json("Thất Bại");
      console.log(error, "err" );
  }
});
// Đăng Nhập
app.post('/dangnhap',(req,res)=>{
  try {
      var md5 = require('md5');   
      var username = req.body.TaiKhoan;
      var password = md5(req.body.MatKhau);
      var sql=`select count(*) as 'Check' FROM users where TaiKhoan='${username}' and MatKhau='${password}'`;
      con.query(sql, function(err, results){
          if (err) throw err;
          results.forEach(element => {
            res.json(element.Check);
          });
      })
  } catch (error) {
      res.json("Thất Bại");
      console.log(error, "err" );
  }
});

app.get('/:Id', (req, res) => {
  var md5 = require('md5');

  console.log(md5('123456'));
  var sql=`SELECT * FROM users where TaiKhoan='${req.params.Id}'`;
  try {
      con.query(sql, function(err, results) {
          if (err) throw err;
          res.json({res:results});
        });
  } catch (error) {
      console.log(error, "err" );
  }
});
// Công Thức
app.get('/monan/congthuc/:Id',(req,res)=>{
  try {
    var sql = `select NguyenLieu.TenNguyenLieu,SoLuongNguyenLieu,ChiTietNguyenLieu from NguyenLieu,ChiTietNguyenLieuMonAn,CongThuc where NguyenLieu.MaNguyenLieu = ChiTietNguyenLieuMonAn.MaNguyenLieu and CongThuc.MaMonAn = ChiTietNguyenLieuMonAn.MaMonAn and CongThuc.MaMonAn = ${req.params.Id}`;
    con.query(sql,function(err, results){
      var sql1=`select ChiTiet  from congthuc where MaMonAn=${req.params.Id}`;
      con.query(sql1, function(err1, results1) {
        return res.json({NguyenLieu:results,CongThuc:results1});
      });
    })
  } catch (error) {
    console.log(error)
  }
})
// Đổi Mật Khẩu
app.put('/changePass/:TaiKhoan',(req,res)=>{
  try {
    var md5 = require('md5')
      // var TaiKhoan=`${req.params.TaiKhoan}`;
      var TaiKhoan=`${req.body.TaiKhoan}`;
      var passwordCurrent = md5(req.body.MatKhauCu);
      var passwordNew = md5(req.body.MatKhauMoi);
      if(passwordCurrent==passwordNew){
          res.json({Check:3});
          return 0;
      }
      var sqlcheck=`select count(*) as 'Check' FROM users where TaiKhoan='${TaiKhoan}' and MatKhau='${passwordCurrent}'`;
      con.query(sqlcheck, function(err, results){
          if (err) throw err;
          results.forEach(element => { 
              if(element.Check==1){
                  sqlchangepass=`UPDATE users set MatKhau='${passwordNew}' WHERE TaiKhoan= '${TaiKhoan}';`
                  con.query(sqlchangepass, function(err, results1){
                      res.json({Check:2});
                  })
              }
              else{
                  res.json({Check:1});
              }
          });
      })
  } catch (error) {
      res.json({Check:4});
  }
});
// Bình Luận
app.post('/binhluan/:idMonAn',(req,res)=>{
  try {
      var idMonAn=`${req.params.idMonAn}`;
      var Details = req.body.NoiDung;
      var username = req.body.TaiKhoan;
      var score = req.body.Diem;
      id=parseInt(idMonAn);
      sql=`INSERT INTO danhgia VALUES (${id},'${username}','${Details}',${score});`
      con.query(sql, function(err, results){
          if (err) throw err;
          res.json("Thành Công");
      })
  } catch (error) {
      res.json("Thất Bại");
  }
});
// Hiển Thị Bình Luận
app.get('/hienthi/:idMonAn',(req,res)=>{
  try {
    var sql = `select * from DanhGia where MaMonAn = ${req.params.idMonAn}`;
    con.query(sql,function(err, results){
      if (err) throw err
        return res.json({data:results});
      });
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, function () {
  console.log('Wait a minute ......');
});
module.exports = app;
