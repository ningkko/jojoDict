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
var searchTerm = document.getElementById('input');

function returnValue(){//get language selection
    if (language.value==="CN->EN"){
        var ENresult = new Array();
        var found = false;
        for(var i = 0; i < data.length; i++){
            var word = data[i].CN
            word = word.toLowerCase();
            word =  word.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
            var targetWord = searchTerm.value
            targetWord = targetWord.toLowerCase();
            targetWord = targetWord.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
            if (word === targetWord){
                ENresult.push(data[i].EN);
                found = true;
            }
        }
        if (found==true){
            document.getElementById("output").innerHTML = ENresult;
        }
        else{
            document.getElementById("output").innerHTML = "没找到_(:з」∠)_</br>检查一下翻译语言？还是没找到的话就发邮件提醒管理员吧";
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
        document.getElementById("output").innerHTML = "Target word not found.</br>_(-ω-`_)⌒)_</br>Please email me to add the term you're looking for.";
        }
    }
}

function changeImg(){
    var obj = document.getElementById("imageSection");  
    if (obj.getAttribute("src") == "img/1.jpg") {
        obj.setAttribute("src", "img/2.jpg");     
    }
    else if (obj.getAttribute("src") == "img/2.jpg") {
        obj.setAttribute("src", "img/3.jpg");     
    }
    else if (obj.getAttribute("src") == "img/3.jpg") {
        obj.setAttribute("src", "img/4.jpg");     
    }    
    else if (obj.getAttribute("src") == "img/4.jpg") {
        obj.setAttribute("src", "img/5.jpg");     
    }    
    else if (obj.getAttribute("src") == "img/5.jpg") {
        obj.setAttribute("src", "img/6.jpg");     
    }    
    else if (obj.getAttribute("src") == "img/6.jpg") {
        obj.setAttribute("src", "img/7.jpg");     
    }
    else if (obj.getAttribute("src") == "img/7.jpg") {
        obj.setAttribute("src", "img/8.jpg");     
    }   
    else if (obj.getAttribute("src") == "img/8.jpg") {
        obj.setAttribute("src", "img/9.jpg");     
    }    
    else if (obj.getAttribute("src") == "img/9.jpg") {
        obj.setAttribute("src", "img/1.jpg");
    }    
}

Array.prototype.unique = function(){
	this.sort();
	var res = [];
	var json = {};
	for (var i = 0; i < this.length; i++) {
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}

var setClass = {
	hasClass: function(elements,cName){	
		if(elements.className.match(new RegExp( "(\\s|^)" + cName + "(\\s|$)") ))
			return true;
		else
			return false;
	},
	addClass: function(elements,cName){	
		if( !this.hasClass( elements,cName ) ){ 
			elements.className += " " + cName; 
		};
	},
	removeClass: function(elements,cName){	
		if( this.hasClass( elements,cName ) ){ 
			elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); 
		}
	}
}

var Bind = function(This){
	return function(){
		This.init();
	}
}

function AutoComplete(input,auto) {
	this.obj = document.getElementById(input);
	this.autoObj = document.getElementById(auto);
	this.search_value = "";
	this.index = -1;
    var arr = new Array()
    if(language.value==="CN->EN"){
        for(var cnindex = 0; cnindex < data.length; cnindex++){
            arr.push(data[cnindex].CN);
    }		
    else if(language.value==="EN->CN"){
        for(var enindex = 0; enindex < data.length; enindex++){
            arr.push(data[enindex].EN);
    }
	this.value_arr = arr

AutoComplete.prototype = {
	init: function(){
		var This = this;
		setClass.removeClass(This.autoObj,"hidden");
		this.autoObj.style.left = this.obj.offsetLeft + "px";
		this.autoObj.style.top = this.obj.offsetTop + this.obj.offsetHeight + "px";
	},
	deleteDIV: function(){
		while(this.autoObj.hasChildNodes()){
			this.autoObj.removeChild(this.autoObj.firstChild);
		}
		setClass.addClass(this.autoObj,"hidden");
	},
	autoOnmouseover: function(index){
		if(index != this.index){
			setClass.addClass(this.autoObj.children[index],"on");
			setClass.removeClass(this.autoObj.children[this.index],"on");
			this.index = index;
		}
	},
	setValue: function(This){
		return function(){
			This.obj.value = this.seq;
			setClass.addClass(This.autoObj,"hidden");
		}
	},
	pressKey: function(event){
		var code = event.keyCode;
		var length = this.autoObj.children.length;
		if(code == 38){		//↑
			setClass.removeClass(this.autoObj.children[this.index],"on");
			this.index--;
			if(this.index < 0){
				this.index = length - 1;
			}
			setClass.addClass(this.autoObj.children[this.index],"on");
			this.obj.value = this.autoObj.children[this.index].seq;
		}else if(code == 40){	//↓
			setClass.removeClass(this.autoObj.children[this.index],"on");
			this.index++;
			if(this.index > length-1){
				this.index = 0;
			}
			setClass.addClass(this.autoObj.children[this.index],"on");
			this.obj.value = this.autoObj.children[this.index].seq;
		}else{		
			this.obj.value = this.autoObj.children[this.index].seq;
			setClass.addClass(this.autoObj,"hidden");
			this.index = -1;
		}
	},

    start: function(event){
		event = event || window.event;
		var code = event.keyCode;
		var This = this;
		if(code != 13 && code != 38 && code != 40){
			this.init();
			this.deleteDIV();
			this.search_value = this.obj.value;
			var valueArr = this.value_arr.unique();
			if(this.obj.value.replace(/(^\s*)|(\s*$)/g,"") == ""){ return;}
			try{
				var reg = new RegExp("("+ this.obj.value +")","i");	//输
			}catch(e){
				alert(e.message); 
			}
			var div_index = 0;	
			for (var i = 0; i < valueArr.length; i++) {
				if(reg.test(valueArr[i])){
					var div = document.createElement("div");
					div.className = "auto_out";
					div.seq = valueArr[i];
					div.index = div_index;
					div.innerHTML = valueArr[i].replace(reg,"<strong>$1</strong>");
					this.autoObj.appendChild(div);
					setClass.removeClass(this.autoObj,"hidden");
					div_index++;
					if(div_index == 1) {
						setClass.addClass(this.autoObj.firstChild,"on");
						this.index = 0;
					}
					div.onmouseover = function(){
						This.autoOnmouseover(this.index);
					}
					div.onclick = this.setValue(This);
				}
			}
		}else{
			this.pressKey(event);
		}
		window.onresize = Bind(This);
	}
}