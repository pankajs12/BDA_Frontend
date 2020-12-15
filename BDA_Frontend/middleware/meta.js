const qs = require('querystring')
const languageFile = require('../static/lang/es-US-middleware-short.json')

export default ({ store, route }) => {
  let pathArray = route.fullPath.split('/')
  pathArray.shift()
  const homeCrumb = {
    name: `${languageFile.navigation.home}`,
    to: '/',
    text: 'home',
    disabled: false,
    icon: 'mdi-home',
    path: '/',
    href: '/'
  }

  if (pathArray.length) {
    pathArray = pathArray.map(i => {
      let name = i
      if (i.includes('?') && i.includes('busqueda')) {
        name = name.replace('busqueda', '')
        name = name.replace(/[?=]/g, ' ')
        name = name.split('&')

        name = name.map(i => {
          return i
        })
      }
      if (i === 'inventario') i = 'busqueda'

      return {
        text: i,
        name: name,
        href: i !== 'busqueda' ? `/busqueda/${i}/` : `/${i}`
      }
    })
  }

  pathArray.unshift(homeCrumb)
  store.set('navigation/route_meta', pathArray)
}
