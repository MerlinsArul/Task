import { Body, Controller, Get, Post } from '@nestjs/common';
import { Tree } from 'src/tree.schema';
import { TreeService } from './tree.service';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.treeService.findAll();
  }

  @Post()
  async create(@Body() tree: Tree): Promise<Tree> {
    return this.treeService.create(tree);
  }
}
