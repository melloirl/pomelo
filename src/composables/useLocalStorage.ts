import { ref, watch, type Ref } from 'vue'

interface UseLocalStorageOptions<T> {
  parse?: (rawValue: string) => T
  serialize?: (value: T) => string
}

const hasWindow = typeof window !== 'undefined'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): Ref<T> => {
  const parse = options.parse ?? ((rawValue: string) => JSON.parse(rawValue) as T)
  const serialize = options.serialize ?? ((value: T) => JSON.stringify(value))
  const state = ref(initialValue) as Ref<T>

  if (!hasWindow) {
    return state
  }

  let shouldPersistCurrentValue = false

  try {
    const storedValue = window.localStorage.getItem(key)

    if (storedValue === null) {
      shouldPersistCurrentValue = true
    } else {
      state.value = parse(storedValue)
    }
  } catch {
    shouldPersistCurrentValue = true
  }

  if (shouldPersistCurrentValue) {
    try {
      window.localStorage.setItem(key, serialize(state.value))
    } catch {
      // localStorage might be blocked in private browsing or strict settings.
    }
  }

  watch(
    state,
    (nextValue) => {
      try {
        window.localStorage.setItem(key, serialize(nextValue))
      } catch {
        // Swallow storage write failures and keep in-memory state reactive.
      }
    },
    { deep: true },
  )

  return state
}
