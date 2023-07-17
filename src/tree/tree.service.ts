import { Injectable } from '@nestjs/common';
import { Tree } from 'src/tree.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TreeService {
  constructor(@InjectModel('Tree') private treeModel: Model<Tree>) {}

  async findAll(): Promise<Tree[]> {
    return this.treeModel.find().exec();
  }

  async create(tree: Tree): Promise<Tree> {
    const newTree = new this.treeModel(tree);
    return newTree.save();
  }
}
