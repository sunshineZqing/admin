<template>
	<div v-on:dblclick.stop="showinput" @click.stop="choosed" class="mytag">
		<span class="tagitemshow" v-show="!editshow" :class="{'choosed':ischoosed}" v-text="value.text">
			<!-- <slot></slot> -->
		</span>
		<input type="text" class="tagitemshow" v-if="editable" v-show="editshow" v-model="curvalue" @keyup.enter="editend" @blur="editend">
	</div>
</template>
<script>
	///定义 mytag组件 

  // 属性    是否允许编辑editable  bgcolor背景色 size尺寸  closable是否可关闭  disable-transitions是否禁用渐变动画  chooseable 是否选中

  // 事件 关闭事件close  编辑事件edit（双击事件=>切换标签进行编辑）  选中事件tochoosed（单击事件=>选中后回传参数填充至本身的数组中。。。） 

  //附加要求：组件长度随内容长度变化
  export default{
  	 name:'yptag',
  	 props:{
  	 	value:Object,   //值
      editable:{
      	type:Boolean,
      	default:false
      },
      bgcolor:{
        type:String,
        default:'#338AE8'
      },
      size:String,
      closable:Boolean,
      disableTransitions:Boolean
  	 },
  	 watch:{
        value(){
        	this.curvalue = this.value.text
        }
  	 },
  	 data(){
        return {
           curvalue:'',//当前值
           editshow:false,//是否显示input
           ischoosed:false, //是否选中
           chooselist:[]  //选中的值
        }
  	 },
  	 mounted(){
        this.curvalue = this.value.text
  	 },
  	 methods:{
        showinput(){//双击编辑
            this.editshow = true
        },
        choosed(){ //单击选中/删除
            this.ischoosed = !this.ischoosed
            this.$emit('tochoosed',[this.value,this.ischoosed])
        },
        editend(){//编辑结束
        	  this.editshow = false
            this.$emit('editend')
            this.$store.dispatch('SAVETAGTEXT',this.curvalue)  
        }
  	 },

  }
</script>
<style lang="less" scoped>
    .mytag{
		text-align: center;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		margin: 5px;
		margin-top: 0;
    }
	.tagitemshow{
		display: inline-block;
		min-width: 50px;
		min-height: 30px;
		line-height: 30px;
		border-radius:26px;
		padding: 0px 10px;
		margin: 0 5px;
		outline: none;
		outline-color:#F37930 ;
		text-align: center;
		cursor: pointer;
		font-size: 14px;
		border: 1px solid #aaa;
	}
	.choosed{
		border: 1px solid #F4A16C;
		background-color: #fdf6ec;
	}
</style>


