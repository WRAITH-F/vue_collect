import VueSelectPicker from './selectPicker'

const install = Vue => {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component("vue-select-picker", VueSelectPicker)
}

VueSelectPicker.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueSelectPicker)
}

export default VueSelectPicker
