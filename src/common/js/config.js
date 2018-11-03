export function changeDate(_date) { //标准日期格式转换
  console.log(typeof (_date))
  if (typeof (_date) != 'object') {
    return _date;
  };
  var value = new Date(_date);
  var year = value.getFullYear()
  var month = value.getMonth() + 1
  var day = value.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return [year, month, day].join('-')
}
export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}
export function changeDate1(_date) { //标准日期格式转换
  if (_date) {
    var value = new Date(_date);
    var year = value.getFullYear()
    var month = value.getMonth() + 1
    var day = value.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    return [year, month, day].join('-')
  }
  return '';
}
//清空对象数组
export function clearObjArr(obj) {
  for (let item in obj) {
    obj[item] = [];
  }
  return obj;
}
//清空对象
export function clearObj(obj) {
  for (let item in obj) {
    obj[item] = '';
  }
  return obj;
}
export function handleReset(name) {
  //重置表单数据
  this.$refs[name].resetFields();
}
export function changeYearAndMonth(_date) { //获取年月
  console.log(typeof (_date), _date)
  // alert();
  // if (typeof(__date) != 'object') {
  //     return _date;
  // };
  var value = new Date(_date);
  var year = value.getFullYear()
  var month = value.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  return [year, month].join('-')
}
export function changeDate_per(_date) { //标准日期格式转换
  var value = new Date(_date);
  var year = value.getFullYear()
  var month = value.getMonth() + 1
  var day = value.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  };
  var dates = year + month;
  // var date = timeConversion(dates);
  return (dates);
}

export function timeConversion(dateString) { //时间字符串转换Date 类型
  // var  str =   "2005-12-15";   
  var d = new Date(dateString.replace(/-/g, "/"));
  return d;
}

export function getDate(value) { //时间戳转换标准时间
  var tt = new Date(value).toLocaleString().replace(/\//g, "-");
  return tt;
}

export function trimStr(str) { //去空格
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function getSysDate() { //封装获取当前系统时间的方法
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    " " + date.getHours() + seperator2 + date.getMinutes() +
    seperator2 + date.getSeconds();
  return currentdate;
}

export function getNodes(arr) {
  // console.log(arr);
  var nodes = [];
  arr.map(function (node) {
    if (node.parentId === '0') {
      node.label = node.deptName
      nodes.push(node)
    } else {
      pushNode(node, nodes)
    }

  })

  return nodes
}

function pushNode(node, pNodes) {
  let charlds = [];
  pNodes.map(function (pNode) {
    if (pNode.id == node.parentId) {

      if (!pNode.children) {
        // console.log('//////'+pNode);
        // alert(111)
        pNode.children = [node];
      } else {
        // alert(222)
        pNode.children.push(node);
      }
    } else {
      if (pNode.children) {
        node.label = node.deptName
        pushNode(node, pNode.children)
      }
    }
    node.label = node.deptName
  })
}
// 根据键值排序  arr.sort(compare('appraisementDate'))
export function compare(prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop]
    var val2 = obj2[prop]
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}

export function filtersPermissionCode_project(permissionCode) { //check 项目权限
  if (sessionStorage.getItem('permissionCode_project') == null) {
    return console.log('无权限');
  };
  let haveBtn = sessionStorage.getItem('permissionCode_project').includes(permissionCode);
  if (haveBtn) {
    return true;
  }
  return false;
}

export function filtersPermissionCode_fund(permissionCode) { //check 基金权限
  if (sessionStorage.getItem('permissionCode_fund') == null) {
    return console.log('无权限');
  };
  let haveBtn = sessionStorage.getItem('permissionCode_fund').includes(permissionCode);
  if (haveBtn) {
    return true;
  }
  return false;
}

export function checkProjectAuth(code, authList = []) {
  if (authList.length == 0) {
    // console.log("项目权限为空, CODE: " + code + '无权限');
    return false;
  }
  let result = authList.includes(code);
  if (!result) {
    console.log("CODE: " + code + '无权限')
  };
  return result;
}

export function checkFundAuth(code, authList = []) {
  if (authList.length == 0) {
    return false;
  }
  let result = authList.includes(code);
  if (!result) {
    console.log("CODE: " + code + '无权限')
  };
  return result;
}

export function toThousands(num) { //js千分位 num为整型类型
  //整型转字符串
  var number = new Number(num);
  var str = number.toString();
  //正则匹配
  var newstr = str.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
    return s + ','
  })
  return newstr;
}

export function formatNum(str) {
  var newStr = "";
  var count = 0;
  if (str.indexOf(".") == -1) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + ".00"; //自动补小数点后两位
    console.log(str)
    return str;
  } else {
    for (var i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
      } else {
        newStr = str.charAt(i) + newStr; //逐个字符相接起来
      }
      count++;
    }
    str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    console.log(str);
    return str;
  }
}
//获取浏览器版本
export function getBrowserAgentr() {
  var agent = navigator.userAgent.toLowerCase();
  var sUserAgent = navigator.userAgent;
  var regStr_ie = /msie [\d.]+;/gi;
  var regStr_ff = /firefox\/[\d.]+/gi
  var regStr_chrome = /chrome\/[\d.]+/gi;
  var regStr_saf = /safari\/[\d.]+/gi;
  //IE  
  if (agent.indexOf("msie") > 0) {
    return 'IE'
  } else if (
    (agent.indexOf("windows nt") > -1 && agent.indexOf("win64") > -1) ||
    (agent.indexOf("windows nt") > -1 && agent.indexOf("win32") > -1)
  ) {
    return 'Edge'
  } else if (agent.indexOf('rv') > 0) {
    if (Math.abs(agent.match(/rv:(\d+\.\d+)/)[1]) == 11) {
      return 'IE'
    }
  } else if (agent.indexOf("firefox") > 0) {
    return 'firefox'
  } else if (agent.indexOf("chrome") > 0) {
    if (agent.indexOf("360ee") > 0) {
      return '360'
    }
    return 'chrome'
  } else if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    return 'safari'
  }
}
//获取浏览器版本
export function getBrowOs() {
  var sUserAgent = navigator.userAgent;
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  if (isMac) return "Mac";
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
  var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
  if (isLinux) {
    if (bIsAndroid) return "Android";
    else return "Linux";
  }
  if (isWin) {
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
    sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
    var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
    if (isWin8) return "Win8";
    var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
    if (isWin10) return "Win10";
  }
  return "其他";
}
//写cookies
export function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + 'path=/';
}

export function setNewCookie(name, value, time) {
  var Days = !!time ? time : 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + 'path=/';
}

//读取cookie
export function getCookies(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

//删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//获取系统版本

//检测ie浏览器版本
export function IeVesion() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
  var ieversion;
  if (Sys.ie) {
    ieversion = parseInt(Sys.ie);
    if (ieversion < 8) {
      alert("尊敬的用户！\n\n 您目前使用的Internet Explorer版本为:" + Sys.ie + "");
      setIsTextReadOnly(true);
    }
  } else if (Sys.firefox) {
    ieversion = Sys.firefox;
    //setIsTextReadOnly(true); 
  } else if (Sys.chrome) {
    ieversion = Sys.chrome;
  } else if (Sys.opera) {
    ieversion = Sys.opera;
  } else if (Sys.safari) {
    ieversion = Sys.safari;
  }
}

export function getExplorerInfo() {
  var explorer = window.navigator.userAgent.toLowerCase();
  //ie 
  if (explorer.indexOf("msie") >= 0) {
    var ver = explorer.match(/msie ([\d.]+)/)[1];
    return {
      type: "IE",
      version: ver
    };
  }
  //firefox 
  else if (explorer.indexOf("firefox") >= 0) {
    var ver = parseInt(explorer.match(/firefox\/([\d.]+)/)[1]);
    return {
      type: "Firefox",
      version: ver
    };
  }
  //Chrome
  else if (explorer.indexOf("chrome") >= 0) {
    var ver = parseInt(explorer.match(/chrome\/([\d.]+)/)[1]);
    return {
      type: "Chrome",
      version: ver
    };
  }
  //Opera
  else if (explorer.indexOf("opera") >= 0) {
    var ver = parseInt(explorer.match(/opera.([\d.]+)/)[1]);
    return {
      type: "Opera",
      version: ver
    };
  }
  //Safari
  else if (explorer.indexOf("Safari") >= 0) {
    var ver = parseInt(explorer.match(/version\/([\d.]+)/)[1]);
    return {
      type: "Safari",
      version: ver
    };
  }
}
