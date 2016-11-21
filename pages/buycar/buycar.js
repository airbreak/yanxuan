var order = ['red', 'yellow', 'green', 'blue', 'red']
Page({
    data: {
        toView: "red",
        scrollTop: 100,
        order:['red', 'yellow', 'green', 'blue', 'red']
    },
    upper: function(e) {
        console.log(e)
    },
    lower: function(e) {
        console.log(e)
    },
    scroll: function(e) {
        console.log(e)
    },
    tap: function(e) {
        for (var i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                })
                break
            }
        }
    },
    tapMove: function(e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },
    onLoad: function () {
        var that = this
        console.log(123132);
    },
    onUnload:function(){
        console.log('out');
    }
})