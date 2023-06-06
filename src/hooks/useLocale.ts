import { computed } from 'vue'
import { Quasar } from 'quasar'
import { useI18n } from 'vue-i18n'

export default function useLocale () {
  const i18 = useI18n()
  const currentLocale = computed(() => {
    return i18.locale.value // 固定写法 获取当前语言设置
  })
  // 切换语言
  const changeLocale = (value: 'zh-CN' | 'en-US') => {
    i18.locale.value = value
    localStorage.setItem('usp_locale', value)// 修改本地存储
    if (value.includes('zh')) {
      void import('quasar/lang/zh-CN').then(lang => {
        Quasar.lang.set(lang.default)
      })
    } else if (value.includes('en')) {
      void import('quasar/lang/en-US').then(lang => {
        Quasar.lang.set(lang.default)
      })
    }
  }
  return {
    currentLocale,
    changeLocale
  }
}
