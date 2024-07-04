const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir(`./Files`, function (err, files) {
    res.render("index", { files });
  });
});
app.get("/read/:filename",function(req,res){
  fs.readFile(`./Files/${req.params.filename}`,function(err,data){
    if(err) console.log(err);
    res.render("read",{data});
  })
})
app.get("/create", function (req, res) {
  const today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();
  const fn = `${day}-${month}-${year}.txt`;

  fs.writeFile(`./Files/${fn}`, "daal chinnnn aata", function (err) {
    if (err) console.log("error");
    res.redirect("/")
  });
});
app.get("/edit/:filename",function(req,res){
    fs.readFile(`./Files/${req.params.filename}`,"utf-8" ,function(err,data){
      if(err) console.log(err);
      res.render("edit",{data, filename:req.params.filename});
    });
})
app.post("/update/:filename",function(req,res){
    fs.writeFile(`./Files/${req.params.filename}`, req.body.filedata,function(err){
      if(err) console.log(err);
      else res.redirect("/");
    })
})
app.get("/delete/:filename",function(req,res){
  fs.unlink(`./Files/${req.params.filename}`,function(err){
    if(err) console.log(err);
    res.redirect("/");
  })
})
app.listen(3000);
