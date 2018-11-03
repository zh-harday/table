const serviceBaseUrl = (process.env.NODE_ENV === 'production')
? 'http://192.168.20.67'  //测试服

: 'http://192.168.20.67' //测试服

export default serviceBaseUrl;
