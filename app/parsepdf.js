var fs = require("fs");
var pdfreader= require('pdfreader')
var csvWriter = require('csv-write-stream')
var flag = false
var count = 0
var temp = ""
var emplname = "",
emplpin = "",
empname = "",
empothername = "",
emppin = ""

var emplnameFlag = false,
emplpinflag = false,
empnameflag = false,
empothernamesflag = false,
emppinflag = false



fs.readFile("test/taxcomp.pdf", (err, pdfBuffer) => {
  // pdfBuffer contains the file content
  var taxcomp = []
new pdfreader.PdfReader().parseBuffer(pdfBuffer, function(err, item){
    if (err)
      callback(err);
    else if (!item){
      var d = new Date()
      var writer = csvWriter()
      writer.pipe(fs.createWriteStream('output'+d.getMonth()+'-'+d.getDate()+'-'+d.getYear()+' '+(d.getHours()+1)+'_'+d.getMinutes()+'.csv'))
      for(obj in taxcomp){
          writer.write(taxcomp[obj])
      }

      writer.end()
      console.log(taxcomp);
        callback();
    }
    else if (item.text){
      if(item.text.startsWith("Employer's Name:")){
        emplnameFlag = true
      //  console.log(item.text);
      }
      if(item.text.includes("Employer's P.I.N:")){
      //  console.log(emplname);
        emplnameFlag = false

        emplpinflag = true

      }
      if(item.text.includes("yee's Main Name:")){
    //    console.log(emplpin);


        empnameflag = true
        emplpinflag = false
        // console.log(item.text);
      }
      if(item.text.includes("yee's Other Names:")){
        //console.log(empname);

        empothernamesflag = true
          empnameflag =false
        // console.log(item.text);
      }
      if(item.text.includes("yees's P.I.N:")){
      //  console.log(empothername);

       empothernamesflag = false
        emppinflag = true
      //  console.log(item.text);
      }
      if(item.text.includes("[00 All Employees]")){
      //  console.log(emppin);

        emppinflag = false
        //console.log("***************");
      }
      if(emplnameFlag){

        if(item.text.includes("Employer's Name:")){
        //  console.log("Nada Nada");
        }else {
emplname = emplname + item.text
        }
      //  console.log(item.text);
      }
      if(emplpinflag){
        if(item.text.includes("Employer's P.I.N:")){
      //    console.log("Nada Nada");
        }else {
emplpin= emplpin + item.text
        }
      //  console.log(item.text);
      }
      if(empnameflag){
        if(item.text.includes("yee's Main Name:")){
      //    console.log("Nada Nada");
        }else {
empname= empname + item.text
        }
        // console.log(item.text);
      }
      if(empothernamesflag){
        if(item.text.includes("yee's Other Names:")){
        //  console.log("Nada Nada");
        }else {
          if(item.text.includes("Empl")){
            console.log("Nada Nada");
        }else{
          empothername= empothername + item.text

        }
      }
      //  console.log(item.text);
      }
      if(emppinflag){
        if(item.text.includes("yees's P.I.N:")){
      //    console.log("Nada Nada");
        }else {

emppin= emppin + item.text
        }
      //  console.log(item.text);
      }

      if(item.text.startsWith("TOTAL TAX (COL.) Kshs")){
        temp = temp.replace(/ /g,"").replace("TOTALS","")
        var str = ""


        for (var i = 0, len = temp.length; i < len; i++) {
          str = str + temp[i]

          if(temp[i] =="."){
            str = str + temp[i+1]
            str = str + temp[i+2]
            str = str + "-"

            i = i + 2
            // break
          }
        }

       console.log(str);
       var cur_totals = str.split("-");

      taxcomp.push({EmpName: emplname, EmpPin: emplpin, Emplname: empname.replace(/ /g,"") + " " + empothername, EmplPin: emppin, "Basic Salary": cur_totals[0],"Benefits Non-Cash": cur_totals[1], "Value of Quarters": cur_totals[2],"Total Gross Pay": cur_totals[3],"E1 30%": cur_totals[4],"E2 - Actual Contibution": cur_totals[5],"E3 - Legal Limit": cur_totals[6], "Owner Occupied Interest": cur_totals[7], "Retirement Contibution": cur_totals[8],"Chargeable Pay": cur_totals[9], "Tax Charged": cur_totals[10], "Monthly Relief": cur_totals[11], "P.A.Y.E Tax": cur_totals[12],  })
empname = ""
    emplpin = ""
  emplname = ""
    empothername = ""
      emppin = ""
    //  console.log("Found");
      temp = ""
      flag = false
      }
      if(flag){
          // console.log(item.text);
          temp = temp + item.text
      }
      if(item.text.startsWith("TOTALS")){
        // console.log(item.text);
        temp = item.text
        flag = true
      }


    }

  });
    //  console.log(taxcomp);
});
