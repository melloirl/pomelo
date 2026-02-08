import { onMounted, onUnmounted, ref } from 'vue'

type ShapeKind = 'circle' | 'ring' | 'diamond'
type ShapeSide = 'left' | 'right'
type ShapeFill = 'page' | 'fill'

export interface ScrollShape {
  id: string
  kind: ShapeKind
  side: ShapeSide
  fill: ShapeFill
  band: number
  top: number
  size: number
  cropRatio: number
}

interface ShapeSystemConfig {
  bandHeight: number
  fillChance: number
  minSize: number
  maxSize: number
  verticalPadding: number
}

type ShapeDensityPreset = 'sparse' | 'balanced' | 'busy'

const SHAPE_DENSITY_PRESET: ShapeDensityPreset = 'busy'

const SHAPE_DENSITY_CONFIG: Record<ShapeDensityPreset, ShapeSystemConfig> = {
  sparse: {
    bandHeight: 360,
    fillChance: 0.58,
    minSize: 88,
    maxSize: 212,
    verticalPadding: 30,
  },
  balanced: {
    bandHeight: 290,
    fillChance: 0.82,
    minSize: 96,
    maxSize: 248,
    verticalPadding: 20,
  },
  busy: {
    bandHeight: 230,
    fillChance: 0.94,
    minSize: 84,
    maxSize: 228,
    verticalPadding: 12,
  },
}

const ACTIVE_SHAPE_CONFIG = SHAPE_DENSITY_CONFIG[SHAPE_DENSITY_PRESET]

const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min

const randomInt = (min: number, max: number) => {
  if (max <= min) {
    return min
  }

  return Math.floor(randomFloat(min, max + 1))
}

const randomShapeKind = (): ShapeKind => {
  const roll = Math.random()

  if (roll < 0.34) {
    return 'circle'
  }

  if (roll < 0.67) {
    return 'ring'
  }

  return 'diamond'
}

const randomShapeFill = (): ShapeFill => (Math.random() > 0.5 ? 'fill' : 'page')

const getBandRange = (viewportTop: number, viewportBottom: number, bandHeight: number) => {
  const startBand = Math.floor(viewportTop / bandHeight)
  const endBand = Math.floor((viewportBottom - 1) / bandHeight)

  return { endBand, startBand }
}

const isVisibleInViewport = (shape: ScrollShape, viewportTop: number, viewportBottom: number) => {
  const shapeBottom = shape.top + shape.size

  return shapeBottom > viewportTop && shape.top < viewportBottom
}

const createShapeForBand = (band: number): ScrollShape => {
  const bandTop = band * ACTIVE_SHAPE_CONFIG.bandHeight
  const maxSizeForBand = Math.max(ACTIVE_SHAPE_CONFIG.minSize, ACTIVE_SHAPE_CONFIG.bandHeight - ACTIVE_SHAPE_CONFIG.verticalPadding * 2)
  const size = randomInt(ACTIVE_SHAPE_CONFIG.minSize, Math.min(ACTIVE_SHAPE_CONFIG.maxSize, maxSizeForBand))
  const availableVerticalRange = Math.max(0, ACTIVE_SHAPE_CONFIG.bandHeight - ACTIVE_SHAPE_CONFIG.verticalPadding * 2 - size)
  const verticalOffset = randomInt(0, availableVerticalRange)
  const top = bandTop + ACTIVE_SHAPE_CONFIG.verticalPadding + verticalOffset
  const side = Math.random() > 0.5 ? 'right' : 'left'
  const mostlyHalfCrop = Math.random() < 0.86
  const cropRatio = mostlyHalfCrop ? randomFloat(0.46, 0.62) : randomFloat(0.32, 0.44)
  const kind = randomShapeKind()
  const fill = randomShapeFill()

  return {
    band,
    cropRatio,
    fill,
    id: `${band}-${Math.round(top)}-${size}-${kind}-${side}-${Math.round(Math.random() * 99999)}`,
    kind,
    side,
    size,
    top,
  }
}

export const useScrollShapes = () => {
  const shapes = ref<ScrollShape[]>([])
  let rafId: number | null = null

  const syncShapes = () => {
    if (typeof window === 'undefined') {
      return
    }

    const viewportTop = window.scrollY
    const viewportBottom = viewportTop + window.innerHeight
    const keptShapes = shapes.value.filter((shape) => isVisibleInViewport(shape, viewportTop, viewportBottom))
    const occupiedBands = new Set(keptShapes.map((shape) => shape.band))
    const { startBand, endBand } = getBandRange(viewportTop, viewportBottom, ACTIVE_SHAPE_CONFIG.bandHeight)

    for (let band = startBand; band <= endBand; band += 1) {
      if (occupiedBands.has(band)) {
        continue
      }

      if (occupiedBands.has(band - 1) || occupiedBands.has(band + 1)) {
        continue
      }

      if (Math.random() > ACTIVE_SHAPE_CONFIG.fillChance) {
        continue
      }

      const shape = createShapeForBand(band)
      keptShapes.push(shape)
      occupiedBands.add(band)
    }

    if (!keptShapes.length) {
      const midpointBand = Math.floor((startBand + endBand) / 2)
      keptShapes.push(createShapeForBand(midpointBand))
    }

    shapes.value = keptShapes.sort((shapeA, shapeB) => shapeA.top - shapeB.top)
  }

  const queueShapeSync = () => {
    if (typeof window === 'undefined' || rafId !== null) {
      return
    }

    rafId = window.requestAnimationFrame(() => {
      rafId = null
      syncShapes()
    })
  }

  onMounted(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.addEventListener('scroll', queueShapeSync, { passive: true })
    window.addEventListener('resize', queueShapeSync)
    queueShapeSync()
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.removeEventListener('scroll', queueShapeSync)
    window.removeEventListener('resize', queueShapeSync)

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  return { shapes }
}
