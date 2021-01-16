---
title: 对linux管道和grep，xrags的学习
date: 2021-01-16 11:52:33
categories: Linux
tags:
description:
preview:
---

## 管道
在linux中，管道可以将两个或多个命令的输入输出链接起来<!--more-->，它将上一个命令的标准输出重定向到下一个命令的标准输入
假设在当前目录下的结构是：
```
.
├── a
│   └── a.txt
├── b
│   └── b.txt
├── c
│   └── c.txt
├── d
│   └── d.txt
├── e
│   └── e.txt
└── test.txt
```
而文件 `test.txt` 内容是：
```
c
a
b
e
d
ab
abc
```
通过执行下面命令，`cat` 命令会将文件 `test.txt` 的内容打印到标准输出，但不会直接显示在标准输出设备上，而是会通过管道 `|` 重定向到 `sort` 命令并被 `sort` 命令排序之后再进行打印:
```
$ cat test.txt | sort
a
b
c
d
e
```
这里要注意的是，在这种使用方式中，后面的命令一定要支持接收标准输入，如果是 `ls` 这种不支持接收标准输入的命令，就会出现下面这种情况：
```
$ cat test.txt | ls
a  b  c  d  e  test.txt
```
显然显示的内容只是 `ls` 命令的输出结果

