<template>
  <!-- 导入列表 -->
  <el-dialog
    :title="uploadTitle"
    :visible.sync="importDialogVisible"
    width="600px"
    @close="cancle"
  >
    <el-form
      ref="fileForm"
      label-width="100px"
    >
      <el-form-item
        label="选择文件"
        prop="file"
      >
        <el-upload
          class="upload-demo"
          ref="upload"
          accept=".xlsx, .xlsm"
          :auto-upload="false"
          action="#"
          :limit="1"
          :file-list="fileList"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
        >
          <el-button
            size="small"
            style="width:400px;text-align:right;"
          >
            <i class="el-icon-folder-opened" />
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="submit"
        :disabled="uploading"
      >
        确定导入
      </el-button>
      <el-button @click="cancle">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
export default {
  name: "ImportDialog",
  props: {
    importFun: {
      required: true
    },
    uploadTitle: {
      type: String,
      default: "导入"
    }
  },
  data() {
    return {
      uploading: true,
      file: {}, // 文件内容
      fileList: [],
      importDialogVisible: false // 控制显示
    };
  },
  beforeMount() {
    this.importDialogVisible = true;
  },
  methods: {
    handleChange(file) {
      this.uploading = false;
      this.file = file;
    },
    // 超出文件个数限制
    handleExceed() {
      this.$openMessage("仅允许上传一个文件！", "warning");
    },
    handleRemove(file) {
      this.uploading = true;
    },
    // 关闭弹窗
    cancle() {
      this.file = {};
      this.fileList = [];
      this.$parent.isImportDialog = false;
      this.uploading = true;
    },
    // 提交
    submit() {
      if (!this.file.size) {
        this.$openMessage("请选择上传的文件", "warning");
        return;
      }
      this.uploading = true;
      let formData = new FormData();
      formData.append("file", this.file.row);
      this.importFun(formData)
        .then(res => {
          this.uploading = false;
          if (res.code === "0") {
            this.$openMessage("导入成功");
            this.$parent.isImportDialog = false;
            this.$emit("importSuccess");
            return;
          }
          this.$emit("importError");
          this.$openMessage(res.msg, "error");
        })
        .catch(error => {
          this.$emit("importError");
          this.uploading = false;
          this.$openMessage(error, "error");
        });
    }
  }
};
</script>

<style scoped lang="stylus">
/deep/.el-upload--text {
  border: none;
  border-radius: 0;
  width: auto;
  height: auto;
  overflow: auto;
}

/deep/.el-upload-list {
  margin-top: -50px;
  margin-left: 5px;
  width: 300px;
}
</style>
