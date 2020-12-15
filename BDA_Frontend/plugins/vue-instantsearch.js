// plugins/vue-instantsearch.js

import algoliasearch from 'algoliasearch/lite'
import { createInstantSearch } from 'vue-instantsearch'
import searchRouting from '../algolia.js'
import { history as historyRouter } from 'instantsearch.js/es/lib/routers'
import { simple as simpleMapping } from 'instantsearch.js/es/lib/stateMappings'



export default function VueInstantSearchPlugin(_, inject) {
  const searchClient = algoliasearch(
    '44COJULZY3',
    'dadeb0d0b44758ca3ae8a69ac98f85a1'
  )

  const { instantsearch } = createInstantSearch({
    searchClient,
    indexName: 'price_low_to_high',
    routing: searchRouting
  })

  inject('instantsearch', instantsearch)
}
