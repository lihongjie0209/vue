/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = [])) // 拿到已经注册的插件列表
    if (installedPlugins.indexOf(plugin) > -1) { // 如果插件已经安装过, 直接退出
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this) // 把 Vue函数添加到参数列表的最开始
    if (typeof plugin.install === 'function') { // 如果插件对象定义的install函数
      plugin.install.apply(plugin, args) // 调用install, this指向插件
    } else if (typeof plugin === 'function') { // 如果插件是一个函数对象
      plugin.apply(null, args) // 调用插件
    }
    installedPlugins.push(plugin)
    return this
  }
}
