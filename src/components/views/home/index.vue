<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <span style="margin-right: 10px;">导航</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="left">单纯搜索条件</el-divider>
    <el-row :gutter="20">
      <el-col :sm="6" :md="6">
        <el-input placeholder="input" clearable v-model="searchForm.input"></el-input>
      </el-col>
      <el-col :sm="6" :md="6">
        <el-select v-model="searchForm.select" placeholder="select" clearable>
          <el-option
            :key="index"
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in selectOption"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :sm="6" :md="6">
        <el-date-picker
          style="width: 100%"
          v-model="selectTime"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <!-- v-if="hasPermission('/pis/finance/list')" -->
      <el-col :sm="6" :md="6" class="right">
        <el-button type="primary" @click="searchList">查询</el-button>
        <el-button @click="resetFun">重置</el-button>
      </el-col>
    </el-row>
    <el-divider content-position="left">带itemName搜索条件</el-divider>
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :sm="6" :md="6">
          <el-form-item label="input">
          <el-input placeholder="input" clearable v-model="searchForm.input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6" :md="6">
          <el-form-item label="select">
            <el-select
              v-model="searchForm.select"
              placeholder="select"
              clearable
            >
              <el-option
                :key="index"
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in selectOption"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6" :md="6">
          <el-date-picker
            style="width: 100%"
            v-model="selectTime"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <!-- v-if="hasPermission('/pis/finance/list')" -->
        <el-col :sm="6" :md="6" class="right">
          <el-button type="primary" @click="searchList">查询</el-button>
          <el-button @click="resetFun">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">table</el-divider>
    <el-table :data="tableData" border @selection-change="handleSelectionChange" v-loading="loading" highlight-current-row class="table-center">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="prdContId" label="节目ID"></el-table-column>
      <el-table-column prop="assetId" label="媒资ID"></el-table-column>
      <el-table-column prop="assetName" label="媒资名称"></el-table-column>
      <el-table-column prop="secondPrdName" label="所属二级产品"></el-table-column>
      <el-table-column prop="prdInfoName" label="商品包名称"></el-table-column>
      <el-table-column prop="publishStatus" label="发布状态">
        <template slot-scope="scope">
          {{ scope.row.publishStatus }}
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">分页</el-divider>
    <div class="pagination">
      <el-pagination
        :current-page="searchForm.page"
        :page-size="searchForm.rows"
        :page-sizes="[20, 50, 100]"
        :total="totalCount"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <el-divider content-position="left"><el-button @click="dialog = true">dialog</el-button></el-divider>
    <el-dialog title="弹窗" :visible.sync="dialog" width="450px" @close="cancle">
      <el-form label-width="100px" :rules="rule" :model="ruleForm" ref="ruleForm">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24">
            <el-form-item label="select" prop="select"></el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24">
            <el-form-item label="input" prop="input"></el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="right">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { baseMixin } from "@/mixins/base";
export default {
  mixins: [baseMixin],
  name: "Home",
  data() {
    return {
      tableData: [{
        prdContId: 1
      }],
      selectOption: [], // select选项
      selectArr: [],    // 多选值
      selectTime: [],   // 如果搜索条件是带时间的搜索用此字段
      searchForm: {     // 搜索条件里面的字段必须在这里事先声明
        input: "",
        select: ""
      },
      // 弹窗信息
      ruleForm: {},
      dialog: false,
      rule: {
        select: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        input: [
          { required: true, message: "请选择", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 初始化获取数据
    getTableData() {},
    // 多选
    handleSelectionChange(val) {
      this.selectArr = val;
    },
    // 表单关闭需要重置
    cancle() {
      this.ruleForm = {};
      if(this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
      this.dialog = false;
    },
    // 表单提交
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(valid);
        } else {
          return false;
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.page{
  background: @base;
}
</style>
