export const baseMixin = {
  data: function () {
    return {
      // 搜索条件
      searchForm: {
        sord: "",
        sidx: "",
        page: 1,
        rows: 20
      },
      restObj: {},   // 搜索条件重置
      tableData: [], // 列表数据
      totalCount: 0, // 数据总条数
      loading: false // 列表数据加载loading
    }
  },
  // 初始化页面
  created() {
    // 获取页面搜索条件
    this.restObj = JSON.parse(JSON.stringify(this.searchForm));
    // 获取初始化数据
    this.getTableData();
  },
  methods: {
    // 页面刷新
    refresh() {
      this.$router.go(0);
    },
    // 分页数量切换
    handleSizeChange(val) {
      this.searchForm.rows = val;
      this.getTableData();
    },
    // 分页切换
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getTableData();
    },
    // 搜索
    searchList() {
      this.searchForm.page = 1;
      this.getTableData();
    },
    // 重置搜索条件
    resetFun() {
      this.searchForm = Object.assign(this.searchForm, this.restObj);
    },
    /**
     * 
     * @param {需要处理的对象} obj 
     * @param {对象里面的需要处理的键组} arr 
     * @param {分割符号}} splitLabel 
     */
    splitFun(obj, arr, splitLabel = ',') {
      arr.forEach(item => {
        if (typeof obj[item] === 'number') {
          obj[item] = [obj[item]];
          return;
        }
        if (obj[item] && typeof obj[item] === 'string') {
          if (obj[item].indexOf(`${splitLabel}`) > -1) {
            obj[item] = obj[item].split(`${splitLabel}`)
          } else {
            obj[item] = [obj[item]];
          }
        }
      });
      return obj;
    },
    joinArr(obj, ...arrItem) {
      arrItem.forEach(item => {
        if (obj[item]) obj[item] = obj[item].join(",");
      });
      return obj;
    },
    // 获取ids
    idsFun(arr, key, isString = true) {
      let ids = arr.map((item) => {
        return item[key]
      });
      if (isString) {
        return ids.join(',');
      }
      return ids
    }
  }
};