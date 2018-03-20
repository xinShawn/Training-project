Page({

  /**
   * 页面的初始数据
   */
  data: {
    aContent: [],
    title: '',
    cover: '',
    time: '',
    aRecommend: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 路由参数
    var _id = options.id

    // 请求文章主要内容
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetGraphic',
        id: _id
      },
      success: (res) => {
        var oContent = JSON.parse(res.data.content)   //文章主题内容

        // 计算出文章发布时间
        var now = new Date()   //现在的时间
        var numStamp = parseInt(res.data.time)    //先将字符串格式的时间转化为数字
        var oldTime = new Date(numStamp)  //发布时的时间戳转化为date对象
        var timeDiff = now - oldTime    //两个时间相差的毫秒数
        var pubTime     //用于保存算出来的时间字符串
        if ((timeDiff / 1000 / 60 / 60) >= 24) {
          var year = oldTime.getFullYear()
          var month = oldTime.getMonth() + 1
          var date = oldTime.getDate()
          var hour = oldTime.getHours()
          var min = oldTime.getMinutes()
          pubTime = year + '-' + month + '-' + date + ' ' + hour + ':' + min
        } else {
          var minDiff = timeDiff / 1000 / 60    //相差的分钟
          if (minDiff >= 60) {
            pubTime = Math.round(minDiff / 60) + '小时前'
          } else if (minDiff < 60 && minDiff >= 5) {
            pubTime = Math.round(minDiff) + '分钟前'
          } else {
            pubTime = '刚刚'
          }
        }

        // 动态修改变量
        this.setData({
          aContent: oContent,
          title: res.data.title,
          cover: res.data.cover,
          time: pubTime
        })

      }
    })

    var ranNum = Math.ceil(Math.random() * 10)    //随机生成请求页面数
    // 请求推荐内容
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetAll',
        page: 1,
        count: ranNum
      },
      success: (res) => {
        var articles = res.data
        var recommends = []
        // 遍历文章内容，将标题都存入recommends
        articles.forEach((item, index) => {
          if(Math.random() - 0.5 > 0 && (recommends.length > 0)) {
            return
          }
          var obj = {
            title: item.title,
            id: item.id
          }
          recommends.push(obj)
        })
        this.setData({
          aRecommend: recommends
        })
      }
    })
  },

  // 推荐阅读标题点击，跳转到对应文章
  toArticle: function (e) {
    var _id = e.currentTarget.dataset.id   //当前点击文章的ID
    wx.redirectTo({
      url: '/pages/article/article?id=' + _id,
    })
  },
  
  // 点击首页，如果有两个页面，就关闭当前页面；有一个则重定向
  toIndex: function () {
    var num = getCurrentPages().length
    if (num > 1) {
      wx.navigateBack()
    } else {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }
  },

  // 设置页面转发的信息
  onShareAppMessage: function (res) {
    return {
      title: this.data.title,
      success: function () {
        wx.showToast({
          title: '转发成功'
        })
      }
    }
  }
})