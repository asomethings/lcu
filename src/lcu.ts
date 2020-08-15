import axios, { AxiosInstance } from 'axios'
import * as https from 'https'
import { AuthKeyNotFoundError } from './error/auth-key-not-found.error'
import { PortNotSpecified } from './error/port-not-specified.error'
import { LcuOptions } from './interface/lcu-options.interface'
import {
  DEFAULT_LCU_CONFIG,
  DEFAULT_LCU_PROTOCOL,
  DEFAULT_LCU_URL,
  RIOT_GAMES_CERTIFICATE,
} from './lcu.constants'

export class LCU {
  private readonly _options: LcuOptions

  constructor(options: LcuOptions = DEFAULT_LCU_CONFIG) {
    this._options = { ...DEFAULT_LCU_CONFIG, ...options }
  }

  /**
   * Returns superagent with default options for requesting
   *
   * @throws {AuthKeyNotFoundError}
   * @returns {AxiosInstance}
   */
  public get agent(): AxiosInstance {
    if (!this.options.authKey) throw new AuthKeyNotFoundError()

    return axios.create({
      timeout: this.options.timeout,
      auth: { username: 'riot', password: this.options.authKey },
      baseURL: this.url,
      httpsAgent: new https.Agent({ cert: RIOT_GAMES_CERTIFICATE }),
    })
  }

  /**
   * Returns LCU options
   *
   * @returns {LcuOptions}
   */
  public get options(): LcuOptions {
    return this._options
  }

  public get url(): string {
    const { protocol, url, port } = this.options
    if (!port) throw new PortNotSpecified()
    return `${protocol ?? DEFAULT_LCU_PROTOCOL}://${
      url ?? DEFAULT_LCU_URL
    }:${port}`
  }

  /**
   * Parses League Of Legends generated lockfile to LcuOptions
   *
   * @param {string} lockfile
   * @returns {LcuOptions}
   */
  public static parse(lockfile: string): LcuOptions {
    const [port, password, schema] = lockfile.split(':').splice(2)
    return {
      authKey: password,
      port: Number(port),
      protocol: schema === 'https' ? 'https' : 'http',
    }
  }
}
