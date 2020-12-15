import { extend } from 'vee-validate'
import { required, alpha, email } from 'vee-validate/dist/rules'
export default ({ app }) => {
  let i18n = app.i18n
  extend('email', {
    ...email,
    message: i18n.t('labels.forms.invalid_email')
  })

  extend('required', {
    ...required,
    message: i18n.t('labels.forms.field_is_required')
  })

  extend('alpha', {
    ...alpha,
    message: 'This field must only contain alphabetic characters'
  })
}
