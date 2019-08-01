import OrgTree from './org-tree'

const install = Vue => {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component("vue-org-tree", OrgTree)
}

OrgTree.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(OrgTree)
}

export default OrgTree