import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard, ProjectArchitectGuard } from 'src/auth.guard';
import { Tree } from 'src/tree.schema';
import { TreeService } from './tree.service';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<any> {
    return this.treeService.findAll();
  }

  @Post()
  // @UseGuards(ProjectArchitectGuard)
  async create(@Body() tree: Tree): Promise<Tree> {
    return this.treeService.create(tree);
  }
}
