import { Namespaces } from '../model/platform-config'
import { InitialConfigurationComplete } from '../model/platform-config/initial-configuration-complete.model'
import { BaseClient } from './base.client'

export class PlatformConfig extends BaseClient {
  protected baseUrl = '/lol-platform-config'

  public async initialConfigurationComplete(): Promise<
    InitialConfigurationComplete
  > {
    return this.agent
      .get(this.buildUrl('v1/initial-configuration-complete'))
      .then((response) =>
        typeof response.data === 'boolean' ? response.data : false,
      )
  }

  public async namespaces(name?: string, key?: string): Promise<Namespaces> {
    return this.agent
      .get(this.buildUrl('v1/namespaces', name, key))
      .then((response) => response.data)
  }
}
