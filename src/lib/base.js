import { deepClone, deepFreeze } from 'quiver-graph/util'
import { MapNodeWithElement } from 'quiver-graph'

import { allSubComponents } from './util/iterate'

const $rawComponent = Symbol('@rawComponent')

export class ComponentBase {
  constructor(options) {
    this[$rawComponent] = this

    const node = new MapNodeWithElement({
      element: this
    })

    return node.transpose()
  }

  get graph() {
    return this.graphNode
  }

  get rawComponent() {
    return this[$rawComponent]
  }

  get id() {
    return this.graph.id
  }

  *subComponents() {
    // no subcomponent in base
  }

  export(namespace = Symbol('@anonymous')) {
    const currentNamespace = this.namespace

    for(let component of allSubComponents(this)) {
      if(component.namespace === currentNamespace)
      component.setNamespace(namespace)
    }

    const { graph } = this
    deepFreeze(graph)

    return () =>
      deepClone(graph).transpose()
  }

  getMeta(key) {
    return this.graph.getMeta(key)
  }

  setMeta(key, value) {
    this.graph.setMeta(key, value)
    return this
  }

  get name() {
    return this.getMeta('name')
  }

  setName(name) {
    this.setMeta('name', name)
    return this
  }

  get namespace() {
    return this.getMeta('namespace')
  }

  setNamespace(namespace) {
    this.setMeta('namespace', namespace)
    return this
  }

  get isQuiverComponent() {
    return true
  }

  get componentType() {
    return 'ComponentBase'
  }
}
