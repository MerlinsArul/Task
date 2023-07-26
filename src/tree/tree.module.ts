import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TreeSchema } from 'src/tree.schema';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tree', schema: TreeSchema }])],
  controllers: [TreeController],
  providers: [TreeService, JwtService],
  exports: [TreeService],
})
export class TreeModule {}
