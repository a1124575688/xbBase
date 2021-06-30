/*
* 用来存放UE对前端的操作
* */
if (window.ue) {
  //路由跳转
  window.ue.XBWeb.lefNav = (index) => {};

  //停车资源态从扎点详情返回
  window.ue.XBWeb.goBackTs = () => {};

  //停车资源态势扎点
  window.ue.XBWeb.parkMarkerTs = (index,status) => {};

  //停车资源态势下钻,地理信息/3D模型切换按钮
  window.ue.XBWeb.modelCutTs = (index) => {};

  //停车特征纵览扎点
  window.ue.XBWeb.parkMarkerTz = (index,status) => {};

  //停车问题问题下钻,地理信息/3D模型切换按钮
  window.ue.XBWeb.modelCutWt = (index) => {};

  //停车问题分析上图元素
  window.ue.XBWeb.legendEvent = (index,status) => {};

  //停车问题分析从扎点详情返回
  window.ue.XBWeb.goBackWt = () => {};

  //公共交通态势上图元素
  window.ue.XBWeb.mapElement = () => {};
}
/*
* 前端定义的全局对象,用来存放UE对前端的操作
* */
window.web = {};
