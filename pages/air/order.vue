<template>
    <div class="container">
          <el-row type="flex" justify="space-between" >
              <!-- 订单表单组件 -->
            <OrderForm />

              <!-- 订单右侧栏组件 -->
              <OrderSide :data="$store.state.air.orderInfo" />
          </el-row>
    </div>
</template>
<script>
import OrderForm from '@/components/air/orderForm'
import OrderSide from '@/components/air/orderSide'
export default {
    components : {
      OrderForm,
      OrderSide
    }
}
</script>
<style lang="less" scoped>
   .container {
       min-width: 1000px;
       width: 1000px;
       margin: 0 auto;
   } 
</style>