# DID(Digital Inheritance Deliverer) , a blockchain project.

## Introduction
DID(Digital Inheritance Deliverer) , designed to enable secure digital asset/inheritance delivery capabilities , is a project for ZJU Blockchain Comprehensive Practice.

It has complete functions, beautiful interface, certain practical value, and should be previewed normally on the browser (tested on Ubuntu 20.04).

This project uses knowledge of **blockchain**, **cryptography**, and** B/S architecture**. Specifically, **Bootstrap(Html css js),Sass,JavaScript,Solidity,Truffle and Ganache** and other techniques are used to develop.

## Preview


![image](https://github.com/1mocat/Blockchain-project/assets/91671140/af3ebc9c-5d7c-44ef-b9f8-9202bd817dd4)

![image](https://github.com/1mocat/Blockchain-project/assets/91671140/fa67dd34-57fd-4489-9315-583cb74ca831)

![image](https://github.com/1mocat/Blockchain-project/assets/91671140/2bed969c-f4a1-4461-a0e8-a25d47d1e697)


## Document 
The **account** folder contains built-in 10 user public keys and private keys, which correspond to users with 10 addresses on ganache.

**Digital_I_D** folder contains all the source code of the project.

# Deployment:
1. Copy this folder to the Linux virtual machines.
2. Start ganache and set the listening port to 8545.
3. You should pre-install truffle and then open terminal, enter this folder directory.
4. Execute **truffle compile** command, and then execute **truffle migrate** command.
5. Enter the app directory of the folder and execute the **npm run dev** command (if the webpack-dev-server.js: not found error occurs, you need to install the relevant packages first).
6. Open localhost:8080 in the browser.

---
## 介绍
DID（数字资产交付者）是浙大区块链综合实践项目，旨在实现安全的数字资产/遗产交付功能，它兼顾功能性，美观性，实用性，创新性，在Ubuntu 20.04的浏览器上可以正常浏览。

该项目用到了**区块链**、**密码学**和 B/S 架构 的知识。具体使用**Bootstrap(Html css js)、Sass、JavaScript、Solidity、Truffle 和 Ganache** 等技术。

## 文件介绍

**account文件夹**中为我们内置的10个用户公钥与私钥，分别对应ganache上10个地址的用户。

**Digital_I_D文件夹**中为我们项目的所有源代码。

# 部署方法：

1、将此文件夹复制到linux虚拟机。

2、启动ganache，并将监听端口设置成8545。

3、打开终端，进入到此文件夹目录下，并预先安装truffle。

4、执行truffle compile指令，随后执行truffle migrate指令。

5、进入文件夹的app目录下，执行npm run dev指令（若出现webpack-dev-server.js: not found报错，需要先安装相关包）。

6、浏览器中打开localhost:8080     
