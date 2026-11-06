import {
  Alert,
  Button,
  ConfigProvider,
  Empty,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
} from 'ant-design-vue'

/**
 * Register only the Ant Design Vue components used by the storefront.
 * Component styles are supplied by Ant Design Vue's CSS-in-JS runtime;
 * we intentionally do not import reset.css to preserve Vesper's site-wide base.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const components = [
    Alert,
    Button,
    ConfigProvider,
    Empty,
    Form,
    Input,
    InputNumber,
    Select,
    Tag,
  ]

  components.forEach((component) => nuxtApp.vueApp.use(component))
})
