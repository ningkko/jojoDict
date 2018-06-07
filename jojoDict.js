// Fetch data from json
var data;
fetch('data.json').then(function(response) {
  if(response.ok) {
    response.json().then(function(json) {
      data = json;
    });
  } else {
    console.log('Network request for data.json failed with response ' + response.status + ': ' + response.statusText);
  }
});

    var language = document.querySelector('#language');
    var searchTerm = document.getElementById('searchTerm');

function returnValue(){//get language selection
    if (language.value==="CN->EN"){
        var ENresult;
        var found = false;
        for(var i = 0; i < data.length; i++){
            var word = data[i].CN
            word = word.toLowerCase();
            word =  word.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
            var targetWord = searchTerm.value
            targetWord = targetWord.toLowerCase();
            targetWord = targetWord.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
            if (word === targetWord){
                ENresult=data[i].EN;
                found = true;
            }
        }
        if (found==true){
        document.getElementById("output").innerHTML = ENresult;
        }
        else{
        document.getElementById("output").innerHTML = "Target word not found.";
        }
    }
    else if(language.value==="EN->CN"){
        
        var CNresult;
        var found = false;
        for(var i = 0; i < data.length; i++){
            var word = data[i].EN
            word = word.toLowerCase();
            word =  word.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
            var targetWord = searchTerm.value
            targetWord = targetWord.toLowerCase();
            targetWord = targetWord.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
            if (word === targetWord){
                CNresult=data[i].CN;
                found = true;
            }
        }
        if (found==true){
        document.getElementById("output").innerHTML = CNresult;
        }
        else{
        document.getElementById("output").innerHTML = "Target word not found.";
        }
    }
}

