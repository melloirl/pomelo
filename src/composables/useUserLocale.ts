import { useLocalStorage } from './useLocalStorage'

export const SUPPORTED_LOCALES = ['en-us', 'pt-br'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'en-us'

const LOCALE_STORAGE_KEY = 'omelodev:locale'
const LOCALE_QUERY_PARAM_KEY = 'locale'
const LOCALE_QUERY_FALLBACK_PARAM_KEY = 'lang'

const normalizeLocale = (candidate: string | null | undefined): AppLocale | null => {
  if (!candidate) {
    return null
  }

  const normalized = candidate.trim().toLowerCase().replace(/_/g, '-')
  const localeToken = normalized.match(/^[a-z]{2}(?:-[a-z]{2})?/)?.[0]

  if (localeToken === 'en') {
    return 'en-us'
  }

  if (localeToken === 'pt') {
    return 'pt-br'
  }

  if (localeToken === 'en-us' || localeToken === 'pt-br') {
    return localeToken
  }

  return null
}

const getLocaleFromQueryParams = (queryParams: URLSearchParams) => {
  return (
    normalizeLocale(queryParams.get(LOCALE_QUERY_PARAM_KEY)) ??
    normalizeLocale(queryParams.get(LOCALE_QUERY_FALLBACK_PARAM_KEY))
  )
}

const getLocaleFromUrl = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const searchParamsLocale = getLocaleFromQueryParams(new URLSearchParams(window.location.search))

  if (searchParamsLocale) {
    return searchParamsLocale
  }

  const hash = window.location.hash
  const hashQueryIndex = hash.indexOf('?')

  if (hashQueryIndex === -1) {
    return null
  }

  const hashQuery = hash.slice(hashQueryIndex + 1)
  return getLocaleFromQueryParams(new URLSearchParams(hashQuery))
}

const selectedLocale = useLocalStorage<AppLocale>(LOCALE_STORAGE_KEY, DEFAULT_LOCALE, {
  parse: (rawValue) => normalizeLocale(rawValue) ?? DEFAULT_LOCALE,
  serialize: (value) => value,
})

const localeFromUrl = getLocaleFromUrl()

if (localeFromUrl && localeFromUrl !== selectedLocale.value) {
  selectedLocale.value = localeFromUrl
}

export const useUserLocale = () => selectedLocale

export const toggleUserLocale = () => {
  selectedLocale.value = selectedLocale.value === 'pt-br' ? 'en-us' : 'pt-br'
}
