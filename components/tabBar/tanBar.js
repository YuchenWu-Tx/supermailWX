// components/tabBar/tanBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data: {
    currentIndex:0
  },

  methods: {
    tabItemClick(e) {
      let index = e.currentTarget.dataset.key
      this.setData({
        currentIndex : index
      })
       this.triggerEvent('mytap',index);
    }
  }
})
