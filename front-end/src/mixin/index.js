export default {
  methods: {
    // 处理规格
    dealSpec (jsonStr) {
      let result = []
      if (jsonStr) {
        result = JSON.parse(jsonStr)
      }
      return result
    }
  }
}
