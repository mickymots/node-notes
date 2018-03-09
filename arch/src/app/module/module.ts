import { MODULE_TYPE } from './module-type.enum'

export interface Module {
  name: string
  code: string
  path: string
  routes: any
  version?: string
  icon?: string
  moduleType?: MODULE_TYPE
  systemDate?: string
  originatorID?: string
  correlationID?: boolean
}
