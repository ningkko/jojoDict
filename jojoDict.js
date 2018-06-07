// Fetch data from json
var data;
fetch('data.json').then(function(response) {
  if(response.ok) {
    response.json().then(function(json) {
      data = json;
      initialize();
    });
  } else {
    console.log('Network request for data.json failed with response ' + response.status + ': ' + response.statusText);
  }
});

var language = document.querySelector('#language');
var searchTerm = document.getElementById('searchTerm');

function returnValue(){//get language selection
    if (language.value==="CN->EN"){
        
        var index = data.find(x => x.CN === searchTerm.value);
        
        if(typeof(index)!="undefined"){
            var ENresult = index.EN;
            document.getElementById("output").innerHTML = ENresult;
        }
        else{
            document.getElementById("output").innerHTML = "Target word not found.";
            }
    }
    else if(language.value==="EN->CN"){
        
        var index = data.find(x => x.EN === searchTerm.value);        

        if(typeof(index)!="undefined"){
            var CNresult = index.CN
            document.getElementById("output").innerHTML = CNresult;
        }
        else{
            document.getElementById("output").innerHTML = "Target word not found.";
            }
    }
}

