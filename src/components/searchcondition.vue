<template>
	<div class="addtions">
		<el-input v-model="conditions.keyword" placeholder="请输入关键字" clearable>
			<i class=" el-icon-search el-input__icon" slot="prefix"></i>
		</el-input>
		<div class="block">
			<el-date-picker v-model="value9" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
		</div>
		<!-- 动态具名插槽  动态搜索条件-->
		<slot name="thetrialconditions"></slot>
		<el-button type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
	</div>
</template>
<script>
	import { dateformat } from '@/utils/index'
	let a = ''
	export default {
		name: 'searchcondition',
		props: ['conditions'],
		mounted() {
			this.conditionsnow = this.conditions
		},
		data() {
			return {
				conditionsnow: {},
				value9: '',
				options: {
					onPick: this.onPick
				}
			}
		},
		methods: {
			onPick({
				maxDate,
				minDate
			}) {
				console.log(4444)
				if(maxDate != null && minDate != null) {
					console.log(this.value9)
					a = dateformat(minDate, "yyyy-MM-dd")

					console.log(dateformat(minDate, "yyyy-MM-dd"))
					// this.conditionsnow.TimeStart = dateformat(minDate,"yyyy-MM-dd")
					// this.conditionsnow.TimeEnd   = dateformat(maxDate,"yyyy-MM-dd")
				}
			},
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			tosearch() { //进行搜索向父组件传递现有搜索条件
				console.log(a)
				this.$emit('tosearch', this.conditionsnow)
			}
		}
	}
</script>
<style lang="less" scoped>
	.addtions {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
		div,
		button {
			margin-left: 20px;
			padding-right:10px ;
		}
		button {
			line-height: 32px;
		}
		div.el-input {
			width: 12%;
		}
	}
</style>