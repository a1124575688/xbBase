import Masks from "../components/common/Masks";
import Paging from '@/components/common/Paging'
import CommonTitle from '@cc/CommonTitle'
import getAnimations from '@/utils/Animations'
import xbcomponent from '@xbcx/component'
import { DatePicker, Message } from 'view-design'
import { tool } from '@/utils/tool'
import PageAPI from '@cp/PageAPI'
export default Vue => {
  Vue.component('CommonTitle', CommonTitle); // 公共标题
	Vue.component('Masks', Masks); // 遮罩
	Vue.component('DatePicker', DatePicker); // view 日期选择器
  Vue.component('PageAPI', PageAPI); // ue调试工具
	Vue.prototype.$Message = Message;
	Vue.use(xbcomponent, { getAnimations }); // 组件库
	Vue.component('Paging', Paging);
  Vue.prototype.$tool = tool;
}
