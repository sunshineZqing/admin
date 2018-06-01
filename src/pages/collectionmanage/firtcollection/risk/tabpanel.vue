<template>
	<div class="msgcontent" >
	<!-- 	<cheatmsg :authitem="authitem" v-show="name=='cheat'"></cheatmsg>
		<maillist :authitem="authitem" v-show="name=='maillist'"></maillist>
		<operator :authitem="authitem" v-show="name=='operator'"></operator>
		<credit   :authitem="authitem" v-show="name=='credit'"></credit>
		<bankflow :authitem="authitem" v-show="name=='bankflow'"></bankflow>
		<accumulationfund :authitem="authitem" v-show="name=='accumulationfund'"></accumulationfund>
		<social        :authitem="authitem" v-show="name=='social'"></social>
		<mailbox       :authitem="authitem" v-show="name=='mailbox'"></mailbox>
		<taobao        :authitem="authitem" v-show="name=='taobao'"></taobao>
		<jd            :authitem="authitem" v-show="name=='jd'"></jd>
		<installed     :authitem="authitem" v-show="name=='installed'"></installed>
		<holographic   :authitem="authitem" v-show="name=='holographic'"></holographic>
		<academic      :authitem="authitem" v-show="name=='academic'"></academic>
		<vehicle       :authitem="authitem" v-show="name=='vehicle'"></vehicle>
		<userstability :authitem="authitem" v-show="name=='userstability'"></userstability> -->

		<cheatmsg  v-show="name=='cheat'"></cheatmsg>
		<maillist  v-show="name=='maillist'"></maillist>
		<operator  v-show="name=='operator'"></operator>
		<credit    v-show="name=='credit'"></credit>
		<bankflow  v-show="name=='bankflow'"></bankflow>
		<accumulationfund  v-show="name=='accumulationfund'"></accumulationfund>
		<social         v-show="name=='social'"></social>
		<mailbox        v-show="name=='mailbox'"></mailbox>
		<taobao         v-show="name=='taobao'"></taobao>
		<jd             v-show="name=='jd'"></jd>
		<installed      v-show="name=='installed'"></installed>
		<holographic    v-show="name=='holographic'"></holographic>
		<academic       v-show="name=='academic'"></academic>
		<vehicle        v-show="name=='vehicle'"></vehicle>
		<userstability  v-show="name=='userstability'"></userstability>
	</div>
</template>

<script>
    const cheatmsg = r => require.ensure([], () => r(require('./cheatmsg.vue')))
    const maillist = r => require.ensure([], () => r(require('./maillist.vue')))
    const operator = r => require.ensure([], () => r(require('./operator.vue')))
	import credit   from './credit'
	import bankflow from './bankflow'
	import accumulationfund from './accumulationfund'
	import social from './social'
	import mailbox from './mailbox'
	import taobao from './taobao'
	import jd from './jd'
	import installed from './installed'
	import holographic from './holographic'
	import academic from './academic'
	import vehicle from './vehicle'
	import userstability from './userstability'
	import { mapGetters } from 'vuex'
	export default{
		name:'tabpanel',
		props:{
			name:String,
			action:String,
			authitem:Object || Array
		},
		components:{cheatmsg,maillist,operator,credit,bankflow,accumulationfund,social,mailbox,taobao,jd,installed,holographic,academic,vehicle,userstability},
	}
</script>