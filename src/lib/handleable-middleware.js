import { combineMiddlewares } from 'quiver-component-util'
import { ExtensibleComponent } from './extensible-component'

export class HandleableMiddleware extends ExtensibleComponent {
  handleableMiddlewareFn() {
    const mainMiddleware = this.mainHandleableMiddlewareFn()
    const extendMiddleware = this.extendMiddlewareFn()

    return combineMiddlewares([mainMiddleware, extendMiddleware])
  }

  mainHandleableMiddlewareFn() {
    throw new Error('abstract method is not implemented')
  }

  isMiddlewareComponent() {
    return true
  }

  get componentType() {
    return 'HandleableMiddleware'
  }
}
