---
title: KCTF2020签到题WP
date: 2020-11-18 21:29:00
tags:
    - 逆向
    - CTF
categories:
	- CTF
preview: https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/52pojie.jpg
description: 
---

#　签到题

<!--more-->

目标程序执行如下：  
![pic1](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic1.png)
需要输入正确的flag  

直接在IDA Pro中打开 F5查看  
![pic2](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic2.png)
分析代码：  

    int __cdecl main(int argc, const char **argv, const char **envp)
    {
    char *v3; // rdx
    signed __int64 v4; // rcx
    int *v5; // r8
    __int64 v6; // rax
    char v7; // dl
    char v8; // cl
    char v9; // cl
    int v11; // [rsp+20h] [rbp-E0h]
    __int16 v12; // [rsp+24h] [rbp-DCh]
    char Dst; // [rsp+30h] [rbp-D0h]
    char v14; // [rsp+31h] [rbp-CFh]
    char v15; // [rsp+32h] [rbp-CEh]
    char v16; // [rsp+33h] [rbp-CDh]
    char v17; // [rsp+34h] [rbp-CCh]
    int v18; // [rsp+35h] [rbp-CBh]
    __int16 v19; // [rsp+39h] [rbp-C7h]
    char v20; // [rsp+3Bh] [rbp-C5h]
    char v21; // [rsp+130h] [rbp+30h]
    char v22; // [rsp+131h] [rbp+31h]
    char v23; // [rsp+132h] [rbp+32h]
    char v24; // [rsp+133h] [rbp+33h]
    char v25; // [rsp+134h] [rbp+34h]
    char v26; // [rsp+135h] [rbp+35h]

    memset(&Dst, 0, 0x100ui64);
    memset(&v21, 0, 0x100ui64);
    sub_140001250((__int64)"KCTF 2020!\n");
    sub_140001250((__int64)"http://bbs.pediy.com\n");
    sub_140001250((__int64)"Please input your flag: ");
    sub_1400011E0((__int64)"%s", &Dst, 256i64);
    v3 = &Dst;
    v4 = -1i64;
    do
        ++v4;
    while ( *(&Dst + v4) );
    if ( (_DWORD)v4 == 12 && Dst == 102 && v14 == 108 && v15 == 97 && v16 == 103 && v17 == 123 && v20 == 125 )
    {
        v5 = &v11;
        v6 = 0i64;
        v12 = v19;
        v3 = 0i64;
        v11 = v18;
        while ( (unsigned __int8)(*(_BYTE *)v5 - 48) <= 9u )
        {
        v3 = (char *)(unsigned int)((_DWORD)v3 + 1);
        v5 = (int *)((char *)v5 + 1);
        if ( (unsigned int)v3 >= 6 )
        {
            v21 = v18;
            v7 = v18 + BYTE1(v18) - 48 + BYTE2(v18) - 48;
            v22 = v18 + BYTE1(v18) - 48;
            v23 = v7;
            v8 = v7 + HIBYTE(v18) - 48;
            v3 = &v21;
            v24 = v8;
            v25 = v8 + v19 - 48;
            v26 = v25 + HIBYTE(v19) - 48;
            while ( 1 )
            {
            v9 = *(&v21 + v6++);
            if ( v9 != a2Efi[v6 - 1] )
                break;
            if ( v6 == 7 )
            {
                sub_140001250((__int64)"You are winner!\n", &v21, "2;=EFI");
                return 0;
            }
            }
            break;
        }
        }
    }
    sub_140001250((__int64)"Try again!\n", v3);
    return -1;
    }

---
![pic3](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic3.png)  

输入的字符串从Dst处开始存放  

![pic7](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic7.png)  

首先会做以下判断：  

![pic4](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic4.png)  

查询ASCII码，DST、v14、v15、v16、v17和v20处对应的字符分别应该是
'f'、'l'、'a'、'g'、'{'和'}'  

然后会继续做以下判断：  

![pic5](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic5.png)  

从v21往后的字符要分别等于a2Efi中的字符，

![pic8](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic8.png)  

看到对应的字符是2;=EFI  

ASCII码分别是 50 59 61 69 70 73  

要比较六个字符，列出以下对应关系：  

    v21 = 50  
    v22 = 59  
    v23 = 61  
    v24 = 69  
    v25 = 70  
    v26 = 73  

观察这六个变量的值是如何取得：  

![pic6](https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/img/KCTF2020-CheckIn-WP/pic6.png)  

发现是根据v18和v19的值决定的  
从上面定义处可以发现v18是一个int型变量，所以占4个字节，四个字节中的值分别设为A、B、C、D  
v19是一个16位的int型，占2个字节，值分别设为E、F  

    BYTE1(v18) 取v18的第二个字节 B
    BYTE2(v18) 取v18的第三个字节 C
    HIBYTE(v18) 取v18最高位的一个字节 D
    HIBYTE(v19) 取v19最高位的一个字节 F
    v18 和 v19 在存放到一个字节的内存时，高位字节丢失，分别取最低位A和E

所以根据上图，列出以下关系式：  

    50 = v21 = A  
    59 = v22 = A + B - 48  
    61 = v23 = A + B - 48 + C - 48   
    69 = v24 = A + B - 48 + C - 48 + D - 48  
    70 = v25 = A + B - 48 + C - 48 + D - 48 + E - 48  
    73 = v26 = A + B - 48 + C - 48 + D - 48 + E - 48 + F - 48  

得到结果：

    A = 50  
    B = 57
    C = 50
    D = 56
    E = 49
    F = 51

对应的字符分别是：2、9、2、8、1、3  
所以得到最终结果就是：flag{292813}

>作者：Boringboys  
>原文链接：https://www.boringboys.top/2020/11/18/KCTF2020签到题WP/  
>版权声明：本文采用[BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)协议授权，转载请遵守此协议