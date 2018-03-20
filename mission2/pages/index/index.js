//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    aImg: [],
    arrArt: [],
    pageCount: 1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    var imgs = [];  //保存多张图片路径。
    var arts = [];  //保存文章的数据内容。
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetAll',
        page: this.data.pageCount,
        count: 4
      },
      success: (res) => {
        var data = res.data
        // 遍历返回的数据，添加到数组imgs之后保存在实例data中
        data.forEach(function (item, index) {
          imgs.push(item.cover)
          var obj = {
            id: item.id,
            title: item.title,
            cover: item.cover
          }
          arts.push(obj)
        })
        var page = ++ this.data.pageCount
        this.setData({
          aImg: imgs,
          arrArt: arts,
          pageCount: page
        })
      }
    })
  },
  onReachBottom: function () {
    // 页面滑动到底部加载更多图片
    var arts = this.data.arrArt;  //保存文章的数据内容。
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetAll',
        page: this.data.pageCount,
        count: 4
      },
      success: (res) => {
        var data = res.data
        // 遍历返回的数据，添加到数组imgs之后保存在实力data中
        data.forEach(function (item, index) {
          var obj = {
            id: item.id,
            title: item.title,
            cover: item.cover
          }
          arts.push(obj)
        })
        var page = ++this.data.pageCount
        this.setData({
          arrArt: arts,
          pageCount: page
        })
      }
    })
  },
  toArticle: function (e) {
    var _id = e.currentTarget.dataset.id   //当前点击文章的ID
    wx.navigateTo({
      url: '../article/article?id=' + _id,
    })
  }
})
