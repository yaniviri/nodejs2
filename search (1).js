var fs = require('fs');
var path = require('path');
var filesToPrint = [];
var ext = process.argv[2];
var text = process.argv[3];

if(ext == undefined)
{
 console.log("USAGE: node search [EXT] [TEXT]");
}
else
{

  FindPhrase(__dirname,ext,text);

  if(filesToPrint.length == 0)
  {
    console.log("No file was found");
  }
  else
  {
    filesToPrint.forEach(element => {
    console.log(element);
    });
  }
}

function FindPhrase(dir,ext,text)
{
    if(!fs.existsSync(dir))
    {
      return;
    }
    var files = fs.readdirSync(dir);
    files.forEach(element => {
      var fileName = path.join(dir,element);
      var isDir = fs.lstatSync(fileName);
      if(isDir.isDirectory())
      {
        FindPhrase(fileName,ext,text);
      }
      else
      {
        if (fileName.indexOf("."+ext) >= 0)
        {
          var data = fs.readFileSync(fileName);
          var regex = new RegExp('\\b'+text+'\\b','i');
          if(regex.test(data))
              filesToPrint.push(fileName);
        }
      }
    });
}