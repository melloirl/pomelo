import { nextTick, onMounted, onUnmounted, ref } from 'vue'

export interface UseHashScrollOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  inline?: ScrollLogicalPosition
  offset?: number
  updateHash?: boolean
  trackedHashes?: readonly string[]
  lockReleaseThreshold?: number
}

export interface ScrollToHashOptions extends UseHashScrollOptions {
  setActiveFromClick?: boolean
}

const defaultOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'nearest',
  offset: 0,
  updateHash: true,
  trackedHashes: [] as readonly string[],
  lockReleaseThreshold: 220,
} as const

const CLICK_LOCK_GRACE_MS = 1200

const normalizeHash = (hash: string) => (hash.startsWith('#') ? hash : `#${hash}`)
const normalizeHashId = (hash: string) => {
  const rawId = hash.replace(/^#/, '')

  if (!rawId) {
    return ''
  }

  try {
    return decodeURIComponent(rawId)
  } catch {
    return rawId
  }
}

const getElementFromHash = (hash: string) => {
  const id = normalizeHashId(hash)

  if (!id) {
    return null
  }

  return document.getElementById(id)
}

const getDistanceFromViewportCenter = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const elementCenterY = rect.top + rect.height / 2
  const viewportCenterY = window.innerHeight / 2

  return Math.abs(elementCenterY - viewportCenterY)
}

const getClosestHashToViewportCenter = (hashes: readonly string[]) => {
  let closestHash = ''
  let closestDistance = Number.POSITIVE_INFINITY

  for (const hash of hashes) {
    const normalizedHash = normalizeHashId(hash)
    const element = getElementFromHash(normalizedHash)

    if (!normalizedHash || !element) {
      continue
    }

    const distance = getDistanceFromViewportCenter(element)

    if (distance < closestDistance) {
      closestDistance = distance
      closestHash = normalizedHash
    }
  }

  if (!closestHash) {
    return null
  }

  return {
    distance: closestDistance,
    hash: closestHash,
  }
}

export const useHashScroll = (baseOptions: UseHashScrollOptions = {}) => {
  const resolvedBaseOptions = { ...defaultOptions, ...baseOptions }
  const activeHash = ref<string | null>(null)
  const clickedHash = ref<string | null>(null)
  const clickedHashReachedCenter = ref(false)
  const clickedHashLockedAt = ref(0)
  let rafId: number | null = null

  const clearClickedHashLock = () => {
    clickedHash.value = null
    clickedHashReachedCenter.value = false
    clickedHashLockedAt.value = 0
  }

  const updateActiveHash = () => {
    if (typeof window === 'undefined') {
      return
    }

    const closest = getClosestHashToViewportCenter(resolvedBaseOptions.trackedHashes)

    if (!closest) {
      return
    }

    if (clickedHash.value) {
      const clickedElement = getElementFromHash(clickedHash.value)

      if (!clickedElement) {
        clearClickedHashLock()
      } else {
        const clickedDistance = getDistanceFromViewportCenter(clickedElement)
        const hasReachedCenter = clickedDistance <= resolvedBaseOptions.lockReleaseThreshold

        if (!clickedHashReachedCenter.value && hasReachedCenter) {
          clickedHashReachedCenter.value = true
        }

        if (!clickedHashReachedCenter.value) {
          const withinGraceWindow = performance.now() - clickedHashLockedAt.value <= CLICK_LOCK_GRACE_MS

          if (withinGraceWindow) {
            activeHash.value = clickedHash.value
            return
          }
        }

        if (hasReachedCenter) {
          activeHash.value = clickedHash.value
          return
        }

        clearClickedHashLock()
      }
    }

    activeHash.value = closest.hash
  }

  const queueActiveHashUpdate = () => {
    if (typeof window === 'undefined' || rafId !== null) {
      return
    }

    rafId = window.requestAnimationFrame(() => {
      rafId = null
      updateActiveHash()
    })
  }

  onMounted(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.addEventListener('scroll', queueActiveHashUpdate, { passive: true })
    window.addEventListener('resize', queueActiveHashUpdate)
    queueActiveHashUpdate()
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.removeEventListener('scroll', queueActiveHashUpdate)
    window.removeEventListener('resize', queueActiveHashUpdate)

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  const scrollToHash = async (hash: string, options: ScrollToHashOptions = {}) => {
    if (!hash || typeof window === 'undefined') {
      return false
    }

    await nextTick()

    const resolvedOptions = { ...resolvedBaseOptions, ...options }
    const normalizedHash = normalizeHash(hash)
    const target = getElementFromHash(normalizedHash)

    if (!target) {
      return false
    }

    if (resolvedOptions.setActiveFromClick) {
      const targetHash = normalizeHashId(normalizedHash)
      clickedHash.value = targetHash
      clickedHashReachedCenter.value = false
      clickedHashLockedAt.value = performance.now()
      activeHash.value = targetHash
    }

    if (resolvedOptions.updateHash) {
      const nextUrl = `${window.location.pathname}${window.location.search}${normalizedHash}`
      window.history.replaceState(null, '', nextUrl)
    }

    if (resolvedOptions.offset !== 0) {
      const top = target.getBoundingClientRect().top + window.scrollY - resolvedOptions.offset
      window.scrollTo({ top, behavior: resolvedOptions.behavior })
      queueActiveHashUpdate()
      return true
    }

    target.scrollIntoView({
      behavior: resolvedOptions.behavior,
      block: resolvedOptions.block,
      inline: resolvedOptions.inline,
    })
    queueActiveHashUpdate()

    return true
  }

  const scrollToCurrentHash = (options: UseHashScrollOptions = {}) => {
    if (typeof window === 'undefined' || !window.location.hash) {
      return Promise.resolve(false)
    }

    return scrollToHash(window.location.hash, { ...options, updateHash: false })
  }

  const onHashClick = (hash: string, options: UseHashScrollOptions = {}) => {
    return (event?: MouseEvent) => {
      event?.preventDefault()
      void scrollToHash(hash, { ...options, setActiveFromClick: true })
    }
  }

  return {
    activeHash,
    onHashClick,
    scrollToCurrentHash,
    scrollToHash,
  }
}
