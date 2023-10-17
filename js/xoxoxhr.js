function bibilailai(str){
    str = str.replace("吗", "")
    str = str.replace("么", "")
    str = str.replace("没", "")
    str = str.replace("?", "!")
    str = str.replace("？", "！")
    console.log(str)
}

function strToCharCodeArray(str) {
    let arrret = [];
    for (let i = 0; i < str.length; i++) {
        arrret.push(str.charCodeAt(i));
    }
    return arrret
}

function charCodeArrayToStr(charCodeArr) {
    strret = ""
    charCodeArr.forEach(
        (charCode) => {
            strret += String.fromCharCode(charCode);
        }
    );
    return strret;
}

function blockXor(arr1, arrkey) {
    let arrret = [];
    for (let i = 0; i < arr1.length; i++) {
        arrret.push(arr1[i] ^ arrkey[i % arrkey.length]);
    }
    return arrret;
}

function givelink2(key) {
    let cipherArray = [14, 76, 68, 72, 16, 92, 74, 24, 20, 19, 21, 25, 87, 20, 67, 85, 16, 0, 71, 24, 90, 92, 8, 74];
    plaintext = charCodeArrayToStr(blockXor(cipherArray, strToCharCodeArray(md5(key))));
    if (plaintext.startsWith("https") || plaintext.startsWith("http")) {
        console.log(plaintext);
    } else {
        bibilailai(key);
    }
}

function givelink(kkeeyy){
    if(md5(kkeeyy)=="3ce6f2a4debbc795c71f51bf966875f3"){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState==4 && xmlhttp.status==200){
                console.log("链接：\n"+xmlhttp.response);
            }
        };
        xmlhttp.open("GET","https://text-1254394685.cos.ap-shanghai.myqcloud.com/links/link",true);
        xmlhttp.send();
    }
};