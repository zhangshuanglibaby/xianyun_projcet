<template>
  <div class="create">
    <div class="container">
      <div class="main">
        <el-row type="flex" justify="space-between">
          <div class="publish">
            <h2 class="title">发表新攻略</h2>
            <p class="share">分享你的个人游记，让更多人看到哦！</p>
            <el-form ref="form" class="form">
              <el-form-item class="input-title">
                <el-input v-model="addPost.title" placeholder="请输入标题" v-myfocus></el-input>
              </el-form-item>
              <el-form-item class="textarea">
                <div>
                  <VueEditor :config="config" ref="vueEditor"/>
                </div>
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
              <el-button type="primary" size="small" @click="handleAdd">发布</el-button>
              <span class="submit-text">
                或者
                <a href="javascript:;" @click="handleSave">保存到草稿箱</a>
              </span>
            </div>
          </div>
          <div class="drafts-aside">
            <h4>
              草稿箱 (
              <span>{{$store.state.post.draftsTitle.length}}</span>)
            </h4>
            <div class="drafts-list">
              <div
                class="drafts-item"
                v-for="(item,index) in $store.state.post.draftsTitle"
                :key="index"
                @click="handleTitle(index)"
              >
                <div class="drafts-post-title">
                  {{item.title}}
                  <i class="el-icon-edit"></i>
                  <el-tooltip content="删除" placement="top" effect="light">
                    <i class="el-icon-remove delete" @click="handleDelete(index)"></i>
                  </el-tooltip>
                </div>
                <p class="time">{{new Date() | timeFormat}}</p>
              </div>
            </div>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
//引入过滤器
import { timeFormat } from "@/tools/myfilters";
//引入自定义指令
import { myfocus } from "@/tools/myDirectives";

let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  name: "app",
  data() {
    //让this指向组件
    var that = this;
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

          //上传之前触发
          uploadBefore(file) {
            // console.log(file)
            if (!file.type.startsWith("image/")) {
              that.$message.warning("请选择正确的图片格式,如jpg/png/jpge");
            }
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
            // console.log(res)
          },
          uploadError() {},
          showProgress: true
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
      //定义一个变量存储store的值
      // draftsTitle: []
    };
  },
  components: {
    //注册富文本框
    VueEditor
  },
  //过滤器
  filters: {
    timeFormat
  },
  //自定义指令
  directives: {
    myfocus
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
      this.addPost.city = obj.name;
    },

    //发布文章
    handleAdd() {
      this.addPost.content = this.$refs.vueEditor.editor.root.innerHTML;
      // console.log(this.addPost)
      //非空检测
      const rules = {
        title: {
          value: this.addPost.title,
          message: "请输入标题"
        },
        city: {
          value: this.addPost.city,
          message: "请选择城市"
        }
      };

      //先假设结果成立
      let valid = true;

      //在循环里面找反例
      Object.keys(rules).forEach(v => {
        //只要有一个不成立即可停止
        if (!valid) return;

        let item = rules[v];

        if (!item.value) {
          valid = false;
          this.$alert(item.message, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });

      if (!valid) return;

      this.$axios({
        url: "/posts",
        method: "post",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: this.addPost
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.$message.success(res.data.message);
          //清空表单
          this.$refs.vueEditor.editor.root.innerHTML = "";
          for (let key in this.addPost) {
            this.addPost[key] = "";
          }
        }
      });
    },

    //保存到草稿箱
    handleSave() {
      //保存到草稿箱需要检测用户是否有登录
      if (!this.$store.state.user.userInfo.token) {
        this.$message.warning("请先登录");
        this.$router.push({ path: "/user/login" });
        return;
      }
      //注意的是需要倒序插入
      //使用vuex管理数据
      this.addPost.content = this.$refs.vueEditor.editor.root.innerHTML;
      // this.draftsTitle.unshift(this.addPost);
      this.$store.commit("post/setDraftsTitle", this.addPost);
      this.$message.success("已保存到草稿箱");
      //刷新当前页面
      location.reload();
    },

    //点击草稿箱的标题显示默认数据
    handleTitle(index) {
      let info = this.$store.state.post.draftsTitle
      this.addPost.title = info[index].title;
      this.$refs.vueEditor.editor.root.innerHTML = info[
        index
      ].content;
      this.addPost.city = info[index].city;
    },

    //删除草稿箱
    handleDelete(index) {
      // console.log(index);
      this.$confirm("确认删除此项草稿吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.commit("post/deleteDraftsTitle", index);
        this.$message.success("删除成功");
        //让内容清空
        for(var key in this.addPost) {
          this.addPost[key] = ""
        }       
        this.$refs.vueEditor.editor.root.innerHTML = ""
      });
    }
  }
  // mounted() {
  //   setTimeout(() => {
  //     this.draftsTitle = [...this.$store.state.post.draftsTitle];
  //     // console.log(this.draftsTitle)
  //   }, 200);
  // }
};
</script>
<style lang="less" scoped>
.create {
  background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1568313381&di=533f8989ebb6c1a8997ca427186fae11&src=http://b-ssl.duitang.com/uploads/item/201701/20/20170120025740_Pjaek.thumb.700_0.jpeg') no-repeat;
  background-size: contain;
  // background-size: 30%;
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
              // background-color: rgb(240, 236, 236);
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
          > span {
            color: darkorange;
          }
        }
        .drafts-list {
          .drafts-item {
            &:hover {
              cursor: pointer;
              color: #ffa500;
              .delete {
                visibility: visible;
                &:hover {
                  color: rgb(236, 60, 60);
                }
              }
            }
            margin-bottom: 10px;
            .drafts-post-title {
              font-size: 14px;
            }
            .delete {
              visibility: hidden;
              margin-left: 40px;
              font-size: 16px;
              color: rgba(0, 0, 0, 0.4);
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
}
</style>