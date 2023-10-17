console.log("根据上面字符画tell一个字符串，可以看到一个被隐藏的链接！\n试试用tell\(string\)的方式给我说句话");
function tell(str){
    if(md5(str)=="9e0121b00c93167da9024d1d48a57f6a"){
        givelink(str+md5(str))
    }else{
        bibilailai(str)
    }
}