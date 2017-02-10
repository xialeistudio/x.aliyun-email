/**
 * Created by xialei on 2017/2/10.
 */
var should = require('should');
var email = require('./index');

var accessKeyId = process.env.AccessKeyId;
var accessKeySecret = process.env.AccessKeySecret;
var accountName = process.env.AccountName;
var fromAlias = process.env.FromAlias;

describe('email', function () {
  this.timeout(30000);
  it('singleSendEmail response should have property EnvId', function (done) {
    email.setOptions({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      accountName: accountName,
      fromAlias: fromAlias
    });
    email.singleSendMail('1065890063@qq.com', '阿里云测试邮件', '阿里云测试').then(function (resp) {
      should(resp).have.property('EnvId');
      done();
    }).catch(done);
  });
});