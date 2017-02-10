#阿里云邮件发送
阿里云官方邮件发送SDK中并没有包含NodeJs版本，而目前很多线上应用的邮件系统一般通过*消息队列+NodeJs*进行处理，可以达到很高的吞吐率。
##调用方法
1. 安装

```bash
npm install x.aliyun-email --save
```

2. 配置通用参数（accessKeyId、accessKeySecret等等）
默认参数如下：

```javascript
var defaultOptions = {
  accessKeyId: null,
  accessKeySecret: null,
  accountName: null,
  fromAlias: null,
  version: '2015-11-23',
  regionId: 'cn-hanzhou',
  baseURL: 'https://dm.aliyuncs.com'
};
```

2. 调用方法

```javascript
var email = require('x.aliyun-email');
// 配置必须参数
email.setOptions({
  accessKeyId: 'accessKeyId',
  accessKeySecret: 'accessKeySecret',
  accountName: 'accountName',
  fromAlias: 'fromAlias'
});
email.singleSendMail('收件人email','邮件标题','邮件正文，支持html').then(function(resp) {
  console.log(resp);
}).catch(function(e) {
  console.error(e);
});
```

##单元测试
1. 设置环境变量
+ accessKeyId
+ accessKeySecret
+ accountName
+ fromAlias

2. 执行测试

```bash
npm run test
```