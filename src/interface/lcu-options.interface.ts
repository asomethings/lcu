export interface LcuOptions {
  protocol?: 'http' | 'https'

  /**
   * LCU Websocket URL
   */
  websocketUrl?: string

  /**
   * LCU URL
   */
  url?: string

  /**
   * LCU Port Number
   */
  port?: number

  /**
   * LCU Auth Key
   */
  authKey?: string

  /**
   * Default Timeout in Milliseconds
   */
  timeout?: number
}
