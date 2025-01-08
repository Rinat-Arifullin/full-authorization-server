import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProviderOptionsSymbol, TypeOptions } from './provider.constats';
import { BaseOAuthProvider } from './services/base-oauth.provider';

@Injectable()
export class ProviderService implements OnModuleInit {
    public constructor(@Inject(ProviderOptionsSymbol) private readonly options: TypeOptions) { }

    // Жизненый цикл который вызывается после разрешения зависимостей модуля
    public onModuleInit() {
        for (const provider of this.options.services) {
            provider.baseUrl = this.options.baseUrl
        }
    }

    public findByService(service: string): BaseOAuthProvider | null {
        return this.options.services.find(s => s.name === service)
    }
}
