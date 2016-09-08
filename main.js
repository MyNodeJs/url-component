var iconv = require('iconv-lite');

exports.urlEncode = function(str, mode) {
  var result,
      str = str || '',
      mode = mode || 'utf-8',
      arr = [];

  if(mode == 'utf-8') {
    result = encodeURIComponent(str);    
  } else if(mode == 'gb2312') {
    str = iconv.encode(str, 'gbk').toString('Hex');
    while(str.length) {
      var substr = str.substring(0, 2);
      arr.push(substr);
      str = str.substring(2);
    }

    str = arr.join('%');
    str = '%' + str;
    result = str;
  } else {
    throw Error('Incoming encoding format error!');
  }

  return result;
};

exports.urlDecode = function(str, mode) {
  var result,
      str = str || '';
      mode = mode || 'utf-8',
      arr = [];

  if(mode == 'utf-8') {
    result = decodeURIComponent(str);
  } else if(mode == 'gb2312' || mode == 'gbk') {
    str = str.substring(1);
    arr = str.split('%');
    arr.forEach(function(val, i) {
      arr[i] = '0x' + val;
    });

    result = iconv.decode(new Buffer(arr), 'gbk');
  }

  return result;
};

