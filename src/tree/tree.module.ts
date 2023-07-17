import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreeSchema } from 'src/tree.schema';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tree', schema: TreeSchema }])],
  controllers: [TreeController],
  providers: [TreeService],
  exports: [TreeService],
})
export class TreeModule {}
