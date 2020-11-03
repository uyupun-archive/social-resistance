import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
  faClipboard,
  faCaretRight,
  faCaretLeft,
  faSync,
} from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

// nuxt.config.jsでCSSファイルを追加
config.autoAddCss = false

// 利用するアイコンを配列に追加
const icons = [faClipboard, faCaretRight, faCaretLeft, faSync, faCheckCircle]

// 利用するアイコンをlibraryに追加
icons.forEach((icon) => library.add(icon))

// グローバルコンポーネントに登録
Vue.component('Fa', FontAwesomeIcon)
