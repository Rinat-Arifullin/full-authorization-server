import { FactoryProvider, ModuleMetadata } from "@nestjs/common"
import { BaseOAuthProvider } from "./services/base-oauth.provider"

export const ProviderOptionsSymbol = Symbol()

export type TypeOptions = {
    baseUrl: string
    services: BaseOAuthProvider[]
}

export type TypeAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<TypeOptions>, 'useFactory' | 'inject'>