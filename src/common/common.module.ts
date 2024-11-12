import { Global, Module } from '@nestjs/common';
import { GlobalConfigsService } from './configs/global.configs.service';

@Global()
@Module({
    providers: [GlobalConfigsService],
    exports: [GlobalConfigsService],
})
export class CommonModule {}