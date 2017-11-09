import { ApolloLink, Observable } from 'apollo-link'

class TracingLink extends ApolloLink {
  constructor(...args) {
    super(...args)
    this.subscribers = []
  }

  request(operation, forward) {
    return new Observable(observer => {
      const _observable = forward(operation)
      _observable.subscribe({
        next: res => {
          const extensions = { ...res.extension, tracing: undefined }
          const availableExtensions = Object.keys(extensions)
          this.subscribers.forEach(handler => handler(res.extensions.tracing))
          observer.next({
            ...res,
            extensions: availableExtensions.length ? undefined : extensions,
          })
          observer.complete()
        },
        error: err => observer.error(err),
      })
    })
  }

  subscribe(handler) {
    this.subscribers.push(handler)
  }
}

export const createTracingLink = () => new TracingLink()
