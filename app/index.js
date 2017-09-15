const {dialog} = require('electron').remote
var fs = require("fs");
var { exec } = require('child_process')
var inputFile = "",
outputFilePath = ""

// Set the file pathe for th pdf document
function openFile(){
//  console.log("Yada Yada");
  dialog.showOpenDialog({filters: [{name: 'Pdf Files', extensions:['js']}]}, function(filenames){

    if(filenames == undefined) return;
    var fileName = filenames[0];
    console.log(fileName);
    inputFile = fileName
  })
}

// open the default saving directory for the generated csv files
function saveFile(){
  console.log("Yada Nada");
  dialog.showOpenDialog({properties: ['openDirectory']}, function(directoryNames){

    if(directoryNames == undefined) return;
    var dirName = directoryNames[0];
    console.log(dirName);
    outputFilePath = dirName
  })
}

// main entry for the process
function generateCSV(){
// check if the outputFilePath and inputFile are se
if(inputFile == ""){
  dialog.showMessageBox({message: "Please enter the Path to (.pdf) file",buttons: ["OK"]})
  return
}
if(outputFilePath == ""){
  dialog.showMessageBox({message: "Please enter the Directory to save the CSV file",buttons: ["OK"]})

  return
}

console.log("Now We areg");
exec("cd app && node parsepdf.js", (error,stdout,stderr) => {
  if(error){
  console.error(`error : ${error}`);
  }
  console.log(stdout);
})
dialog.showMessageBox({message: "File Parsed Successfully! :-), see :" + outputFilePath,buttons: ["OK"]})


}
