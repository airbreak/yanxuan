/**
 * Created by jimmy-jiang on 2016/11/19.
 */
class HttpRequest{
    constructor(){

    }
    request(param) {
        wx.request({
            url: param.url, //仅为示例，并非真实的接口地址
            data: param.data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                param.callback && param.callback(res.data);
            },
            fail: function (err) {
                err;
            }
        });
    }
};

module.exports = {
    HttpRequest: HttpRequest
}