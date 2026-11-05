import { deleteLine } from '../../utils/cartStore'

interface Body {
  lineId?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const lineId = String(body?.lineId ?? '').trim()

  if (!lineId) {
    throw createError({ statusCode: 400, statusMessage: 'lineId is required' })
  }

  try {
    return { cart: await deleteLine(event, lineId) }
  } catch (error) {
    throw createError({
      statusCode: 422,
      statusMessage: error instanceof Error ? error.message : 'Could not remove item',
    })
  }
})
