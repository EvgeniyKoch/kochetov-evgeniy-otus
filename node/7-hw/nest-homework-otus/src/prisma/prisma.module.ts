import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // global connect services to orm
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // When a provider needs to be visible outside a module, it is first exported from its host module, and then imported into its consuming module (for example auth.service)
})
export class PrismaModule {}
