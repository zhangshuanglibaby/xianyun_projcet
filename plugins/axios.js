//添加错误拦截器插件

//引入element ui的第三方组件
import {Message} from 'element-ui'

//使用onError用于错误拦截
export default({$axios}) => {
    // console.log(axios)
    //通过onError方法可以返回错误
    $axios.onError(res => {
        //res是一个错误的对象,有一个response属性可以访问错误的信息
        // console.log(res.response)
        //利用结构的方法获取数据
       const {message,statusCode} = res.response.data
       //通过检测statusCode返回错误信息
       if(statusCode === 400) {
           Message.error(message)
       }
       if(statusCode === 401 || statusCode === 403) {
        Message.error('请先登录或注册账号')
        setTimeout(() => {
            location.href = "/user/login"
        },1000)
    }
    })
}