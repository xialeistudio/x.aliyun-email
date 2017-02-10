/**
 * Created by xialei on 2017/2/10.
 */
'use strict';
var moment = require('moment');
var _ = require('underscore');
var uuid = require('node-uuid');
var crypto = require('crypto');

/**
 * HmacSHA1签名
 * @param data 待签名数据
 * @param key 密钥
 * @constructor
 */
exports.HmacSHA1 = function (data, key) {
  return crypto.createHmac('sha1', key).update(data).digest().toString('base64');
};

/**
 * 计算参数签名
 * @param params
 * @param appKey
 */
exports.sign = function (params, appKey) {
  if (appKey === undefined) {
    throw new Error('appKey不能为空');
  }
  var keys = _.allKeys(params).sort();
  var allSignString = 'POST&' + encodeURIComponent('/') + '&';
  var signString = '';
  keys.forEach(function (key) {
    signString += ('&' + key + '=' + encodeURIComponent(params[key]));
  });
  signString = signString.substr(1, signString.length);
  allSignString += encodeURIComponent(signString);
  return exports.HmacSHA1(allSignString, appKey + '&');
};

/**
 * 生成公共请求参数
 * @param subject
 * @param body
 * @param toAddress
 * @param accountName
 * @param fromAlias
 * @param accessKeyId
 * @param accessKeySecret
 * @param version
 * @param regionId
 * @return {{Format: string, Version: (*|string), AccessKeyId: *, SignatureMethod: string, Timestamp: string, SignatureVersion: string, SignatureNonce: *, Action: string, AccountName: *, ReplyToAddress: boolean, AddressType: number, ToAddress: *, Subject: *, HtmlBody: (*|HTMLElement), FromAlias: *, RegionId: (*|string)}}
 */
exports.buildCommonRequestParams = function (subject, body, toAddress, accountName, fromAlias, accessKeyId, accessKeySecret, version, regionId) {
  if (!subject) {
    throw new Error('subject不能为空');
  }
  if (!toAddress) {
    throw new Error('toAddress不能为空');
  }
  if (!accountName) {
    throw new Error('accountName不能为空');
  }
  if (!accessKeyId) {
    throw new Error('accessKeyId不能为空');
  }
  if (!accessKeySecret) {
    throw new Error('accessKeySecret不能为空');
  }
  if (!fromAlias) {
    throw new Error('fromAlias不能为空');
  }
  var nonceStr = uuid.v4();
  var timestamp = moment().subtract(moment().utcOffset(), 'minutes').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  var params = {
    Format: 'JSON',
    Version: version,
    AccessKeyId: accessKeyId,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: timestamp,
    SignatureVersion: '1.0',
    SignatureNonce: nonceStr,
    Action: 'SingleSendMail',
    AccountName: accountName,
    ReplyToAddress: true,
    AddressType: 1,
    ToAddress: toAddress,
    Subject: subject,
    HtmlBody: body,
    FromAlias: fromAlias,
    RegionId: regionId
  };
  params.Signature = exports.sign(params, accessKeySecret);
  return params;
};