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

function bibilailai(str){
    str = str.replace("吗", "")
    str = str.replace("么", "")
    str = str.replace("没", "")
    str = str.replace("?", "!")
    str = str.replace("？", "！")
    console.log(str)
}