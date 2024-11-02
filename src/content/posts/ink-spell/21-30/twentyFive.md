---
title: 'nest 使用 邮箱验证码'
description: 'nest 使用 邮箱验证码'
pubDate: '2024-10-07 07:29:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/twentyFive.png'
tags: ['ink-spell']
selected: false
---

## nest 使用 邮箱验证码

### 1. 安装依赖

```bash
pnpm i nodemailer @nestjs-modules/mailer
```

### 2.配置文件

```js
export default {
  // ...
  EMAIL: {
    // 别名，自己定义
    alias: 'WEBXUE',
    // 邮件服务器地址
    host: 'smtp.163.com',
    // 邮件服务器端口
    port: 465,
    // 是否使用默认465端口
    secure: true,
    // 你的邮箱
    user: '<xxx@163.com>',
    // 你的授权码
    pass: 'XXXXXXXX',
  },
}
```

1. alias：邮箱别名，比如你用<xiaowang@test.com>这个邮箱给别人发送验证码，但你不想让别人直接看到你的邮箱，可以使用这个alias给个别名xiaowang，此时对方看到的就是xiaowang给自己发了个邮件。
2. host：邮件服务器地址，这个取决于你自己的邮箱，我这里使用的是163邮箱，所以这里的服务器地址就是163邮箱的地址。至于这个地址从哪来，可以登录上你的邮箱，进行查看。
3. port：邮件服务器端口，这个端口默认都是465，如果你的邮件服务器是你自己的，那你可能修改过，这里如实填写即可。
4. secure：是否使用默认端口，如果port你使用的是465，这里就是true，否则就是false。
5. user：你用来给用户发送邮件的邮箱号。
6. pass：你的授权码，注意，授权码不等同于密码，是需要自己申请的。

### 3.封装类

[官网示例](https://nodemailer.com/about/)

```js
import * as nodemail from "nodemailer";
import { EMAIL } from "src/config";
export class Email {
      private transporter = null;
    // 通过nodemail的createTransport方法创建这个服务，将config中的参数依次传入
  constructor(){
    this.transporter = nodemail.createTransport({
    host: EMAIL.host,
    port: EMAIL.port,
    secure: EMAIL.secure,
    auth: {
      user: EMAIL.user,
      pass: EMAIL.pass,
    },});
  }
  // 发送验证码的方法
  send({ email, subject = "WEBXUE", html }) {
    const code = Math.random().toString().slice(-6);
    const options = {
      from: `${EMAIL.alias}<${EMAIL.user}>`,
      to: email,
      subject,
      text: `验证码为${code}`,
      html,
    };
    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log("邮件发送失败");
        console.log(error);
      } else {
        console.log("邮件发送成功");
        console.log(info);
      }
    });
  }
}
```

1. 这个方法接收三个参数，**email** 为发给对方的邮箱号，**subject** 为标题，**html** 为要发送的 **html** 内容
2. 通过生成一个随机数截取后六位作为验证码
3. 构造一个 **options**，为发送邮件的参数
4. 通过 **transporter** 的 **sendMail** 方法来发送邮件。

### 4.使用方法

 ```js
 await new Email().send({
   email: request.email,
   subject: "WEBXUE - 欢迎注册"
 });
 ```

[参考文章](https://juejin.cn/post/7220725356457164859)
