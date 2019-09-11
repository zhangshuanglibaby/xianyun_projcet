<template>
  <div class="container">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <div class="publish">
          <h2 class="title">发表新攻略</h2>
          <p class="share">分享你的个人游记，让更多人看到哦！</p>
          <el-form ref="form" :model="form" class="form">
            <el-form-item class="input-title">
              <el-input v-model="input" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item class="textarea">
              <VueEditor :config="config" ref="vueEditor" />
            </el-form-item>
            <el-form-item label="选择城市" class="city">
              <i class="el-icon-location"></i>
              <el-autocomplete
                v-model="addPost.city"
                :fetch-suggestions="querySearchCity"
                :trigger-on-focus="false"
                placeholder="请搜索游玩城市"
                @select="handleSelect"
                @blur="handleBlur"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
          <div class="submit-btn">
            <el-button type="primary" size="small">发布</el-button>
            <span class="submit-text">
              或者
              <a href="#">保存到草稿箱</a>
            </span>
          </div>
        </div>
        <div class="drafts-aside">
          <h4>草稿箱 ( 1 )</h4>
          <div class="drafts-list">
            <div class="drafts-item">
              <div class="drafts-post-title">
                文字
                <i class="el-icon-edit"></i>
              </div>
              <p class="time">{{new Date() | timeFormat}}</p>
            </div>
            <div class="drafts-item">
              <div class="drafts-post-title">
                文字
                <i class="el-icon-edit"></i>
                <p class="time">{{new Date() | timeFormat}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.snow.css";
import moment from "moment";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  name: "app",
  data() {
    return {
      //引入富文本框配置
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            // ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values

            ["image", "video"]
            // [{ list: "ordered" }, { list: "bullet" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            // [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      },
      //绑定新增文章数据
      addPost: {
        content: "", //文章内容
        title: "", //文章标题
        city: "" //城市id/名称
      },
      //定义城市数据
      cityData: []
    };
  },
  components: {
    //注册富文本框
    VueEditor
  },
  //过滤器
  filters: {
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD");
    }
  },
  methods: {
    //输入搜索游玩城市触发
    querySearchCity(queryString, cb) {
      // console.log(queryString)
      //获取城市
      this.$axios({
        url: "/airs/city",
        params: { name: queryString }
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.cityData = res.data.data.map(e => {
            return {
              ...e,
              value: e.name
            };
          });
          cb(this.cityData);
        }
      });
    },

    //搜索游玩城市触发失焦触发
    handleBlur() {
      //当用户没有输全时默认第一个
      if (this.addPost.city) {
        this.addPost.city = this.cityData[0].name;
      }
    },

    //选中下拉项时触发
    handleSelect(obj) {
      // console.log(obj)
      this.addPost.city = obj.name
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  min-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  .main {
    .publish {
      width: 750px;
      .title {
        font-size: 22px;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .share {
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
      }
      .form {
        .textarea {
          /deep/.ql-editor {
            height: 400px;
          }
        }
        .city {
          .el-icon-location {
            font-size: 18px;
            color: #00a0ff;
          }
        }
      }
      .submit-btn {
        .submit-text {
          font-size: 14px;
          margin-left: 10px;
          a {
            color: #ffa500;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    .drafts-aside {
      width: 200px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      height: fit-content;
      h4 {
        font-weight: normal;
        font-size: 16px;
        color: #666;
        margin-bottom: 10px;
      }
      .drafts-list {
        .drafts-item {
          margin-bottom: 10px;
          .drafts-post-title {
            font-size: 14px;
          }
          .time {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>