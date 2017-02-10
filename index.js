/**
 * Created by xialei on 2017/2/10.
 */
var _ = require('underscore');
var fetch = require('node-fetch');
var utils = require('./lib/utils');
var qs = require('querystring');

var defaultOptions = {
  accessKeyId: null,
  accessKeySecret: null,
  accountName: null,
  fromAlias: null,
  version: '2015-11-23',
  regionId: 'cn-hanzhou',
  baseURL: 'https://dm.aliyuncs.com'
};
/**
 * 设置配置
 * @param options
 */
exports.setOptions = function (options) {
  defaultOptions = _.extend(defaultOptions, options);
};
/**
 *
 * @param email
 * @param subject
 * @param body
 * @return {Promise}
 */
exports.singleSendMail = function (email, subject, body) {
  if (!defaultOptions.accessKeyId) {
    throw new Error('请通过setOptions方法配置必要参数');
  }
  var params = utils.buildCommonRequestParams(subject, body, email, defaultOptions.accountName, defaultOptions.fromAlias, defaultOptions.accessKeyId, defaultOptions.accessKeySecret, defaultOptions.version, defaultOptions.regionId);
  var data = qs.stringify(params);
  return fetch(defaultOptions.baseURL, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: data
  }).then(function (resp) {
    return resp.json();
  }).then(function (resp) {
    if (resp.Code !== undefined) {
      throw new Error(resp.Message);
    }
    return resp;
  });
};