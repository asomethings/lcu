import { LCU } from '../lcu'

export abstract class BaseClient {
  protected abstract baseUrl: string

  constructor(protected readonly lcu: LCU) {}

  protected buildUrl(...paths: Array<string | undefined>): string {
    return [this.baseUrl, ...paths].filter((path) => Boolean(path)).join('/')
  }

  protected get agent() {
    return this.lcu.agent
  }
}
