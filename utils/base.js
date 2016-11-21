/**
 * Created by jimmy-jiang on 2016/11/21.
 */

//http 请求类
class Base{
    constructor(){

    }

    //http
    request(param) {
        wx.request({
            url: param.url,
            data: param.data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                param.sCallback && param.sCallback(res.data);
            },
            fail: function (err) {
                err;
            }
        });
    }

    //时间格式化
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()


        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }

    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
};

module.exports = {
    base: Base
}