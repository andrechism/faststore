import { mutate } from 'swr'
import type { Cache } from 'swr'

import { request } from './request'
import { getKey } from './useQuery'
import type { RequestOptions } from './request'
import { TypedDocumentString } from '@generated/graphql'

export const prefetchQuery = <Data, Variables = Record<string, unknown>>(
  operation: TypedDocumentString<any, any>,
  variables: Variables,
  { cache, ...options }: Partial<RequestOptions> & { cache: Cache }
) => {
  const key = getKey(operation['__meta__']['operationName'], variables)

  if (cache.get(key)) {
    return
  }

  mutate(key, request<Data, Variables>(operation, variables, options))
}
