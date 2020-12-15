/* global instantsearch */

import { history as historyRouter } from 'instantsearch.js/es/lib/routers'

const router = historyRouter({
  createURL({ routeState, qsModule, location }) {
    const urlParts = location.href.match(/^(.*?)\/busqueda/)
    const baseUrl = `${urlParts ? urlParts[1] : ''}/busqueda`
    const pathnameMatches = location.pathname.match(/busqueda\/(.*?)\/?$/)
    const pathNamesWithParams =
      pathnameMatches && pathnameMatches[1]
        ? pathnameMatches[1].split('/')
        : undefined

    const queryParameters = {}
    let condition =
      pathNamesWithParams && pathNamesWithParams[0]
        ? pathNamesWithParams[0]
        : undefined
    let make =
      pathNamesWithParams && pathNamesWithParams[1]
        ? pathNamesWithParams[1]
        : undefined
    let model =
      pathNamesWithParams && pathNamesWithParams[2]
        ? pathNamesWithParams[2]
        : undefined
    let trim =
      pathNamesWithParams && pathNamesWithParams[3]
        ? pathNamesWithParams[3]
        : undefined

    if (routeState.query) {
      queryParameters.query = encodeURIComponent(routeState.query)
    }
    if (routeState.page !== 1) {
      queryParameters.page = routeState.page
    }
    if (routeState.make) {
      make = routeState.make[0]
    }
    if (routeState.model) {
      model = routeState.model[0].replace(/[ ]/g, '~')
    }
    if (routeState.condition) {
      condition = routeState.condition[0]
    }
    if (routeState.trim) {
      trim = routeState.trim[0].replace(/[ ]/g, '~')
    }

    if (pathNamesWithParams && routeState.make === undefined) {
      return `${baseUrl}/${pathNamesWithParams.join('/')}`
    } else {
      if (condition && make && model && trim) {
        return `${baseUrl}/${condition}/${make}/${model}/${trim}`
      } else if (condition && make && model) {
        return `${baseUrl}/${condition}/${make}/${model}`
      } else if (condition && make) {
        return `${baseUrl}/${condition}/${make}`
      } else if (condition) {
        return `${baseUrl}/${condition}`
      } else {
        return `${baseUrl}`
      }
    }
  },

  parseURL({ qsModule, location }) {
    const pathnameMatches = location.pathname.match(/busqueda\/(.*?)\/?$/)
    let category = (pathnameMatches && pathnameMatches[1]) || undefined
    if (category) {
      category = category.split('/')
    }

    const { query = '', page } = qsModule.parse(location.search.slice(1))
    return {
      query: decodeURIComponent(query),
      page,
      category: category,
      hierarchicalFacets: category
    }
  }
})

const stateMapping = {
  stateToRoute(uiState) {
    // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
    return {
      hierarchicalMenu: {
        'categories.lvl0':
          uiState.hierarchicalMenu &&
          uiState.hierarchicalMenu['categories.lvl0']
            ? uiState.hierarchicalMenu['categories.lvl0']
            : undefined
      },
      query: '',
      make: uiState.refinementList && uiState.refinementList.make,
      model: uiState.refinementList && uiState.refinementList.model,
      condition: uiState.refinementList && uiState.refinementList.condition,
      trim: uiState.refinementList && uiState.refinementList.trim
    }
  },

  routeToState(routeState) {
    let categories = (routeState && routeState.category) || ''
    // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
    return {
      hierarchicalFacets: routeState.hierarchicalFacets
        ? routeState.hierarchicalFacets
        : undefined,
      page: routeState && routeState.page ? routeState.page : 0,
      categories: categories,
      refinementList: {
        make:
          routeState &&
          routeState.facetsRefinements &&
          routeState.facetsRefinements.make
            ? routeState.facetsRefinements.make
            : [],
        model:
          routeState &&
          routeState.facetsRefinements &&
          routeState.facetsRefinements.model
            ? routeState.facetsRefinements.model.map(v =>
                v.replace(/[~]/g, ' ')
              )
            : [],
        condition:
          routeState &&
          routeState.facetsRefinements &&
          routeState.facetsRefinements.condition
            ? routeState.facetsRefinements.condition
            : [],
        trim:
          routeState &&
          routeState.facetsRefinements &&
          routeState.facetsRefinements.trim
            ? routeState.facetsRefinements.trim.map(v => v.replace(/[~]/g, ' '))
            : []
      }
    }
  }
}

const searchRouting = {
  router,
  stateMapping
}

export default searchRouting
