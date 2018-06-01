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

		<cheatmsg  v-if="name=='cheat'"></cheatmsg>
		<maillist  v-if="name=='maillist'"></maillist>
		<operator  v-if="name=='operator'"></operator>
		<credit    v-if="name=='credit'"></credit>
		<bankflow  v-if="name=='bankflow'"></bankflow>
		<accumulationfund  v-if="name=='accumulationfund'"></accumulationfund>
		<social         v-if="name=='social'"></social>
		<mailbox        v-if="name=='mailbox'"></mailbox>
		<taobao         v-if="name=='taobao'"></taobao>
		<jd             v-if="name=='jd'"></jd>
		<installed      v-if="name=='installed'"></installed>
		<holographic    v-if="name=='holographic'"></holographic>
		<academic       v-if="name=='academic'"></academic>
		<vehicle        v-if="name=='vehicle'"></vehicle>
		<userstability  v-if="name=='userstability'"></userstability>
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