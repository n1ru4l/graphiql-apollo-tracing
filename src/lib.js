import isEqual from 'lodash.isequal'
import memoize from 'lodash.memoize'

export const getChildResolvers = (resolvers, path, isList) =>
  resolvers.filter(resolver => {
    if (path.length === resolver.path.length) return false

    const slicedPath = resolver.path.slice(
      0,
      resolver.path.length - 1 - (isList ? 1 : 0),
    )

    return slicedPath.length === path.length && isEqual(path, slicedPath)
  })

export const parseType = memoize(typeName => {
  let pre = ``
  let after = ``

  if (typeName.charAt(0) === `[`) {
    pre = `[`
    after = `]`
  }

  const lastChar = typeName.charAt(typeName.length - 1)
  if (lastChar === `!`) {
    after += `!`
  }

  const type = typeName.substr(
    pre.length,
    typeName.length - after.length - pre.length,
  )

  return { pre, type, after }
})

export const formatNano = nano => {
  const micro = nano / 1000
  if (micro < 1) return nano.toFixed(2) + ` ns`
  const milli = micro / 1000
  if (milli < 1) return micro.toFixed(2) + ` µs`
  const second = milli / 1000
  if (second < 1) return milli.toFixed(2) + ` ms`
  return second.toFixed(2) + ` s`
}
