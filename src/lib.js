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

export const groupChildren = children =>
  children.reduce((groupedChilds, children) => {
    const index = children.path[children.path.length - 2]

    if (!Array.isArray(groupedChilds[index])) {
      groupedChilds[index] = []
    }
    groupedChilds[index].push(children)
    return groupedChilds
  }, [])

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
