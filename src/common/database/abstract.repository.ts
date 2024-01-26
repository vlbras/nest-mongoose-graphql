import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(data: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model(data);
    return createdDocument.save();
  }

  async find(filterQuery?: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean();
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean().exec();
    if (!document) {
      throw new NotFoundException(`${this.model.modelName} not found!`);
    }
    return document as TDocument;
  }

  async updateOne(
    filterQuery: FilterQuery<TDocument>,
    data: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, data, {
      new: true,
    });
    if (!document) {
      throw new NotFoundException(`${this.model.modelName} not found!`);
    }
    return document;
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    await this.findOne(filterQuery);
    return this.model.findOneAndDelete(filterQuery).lean();
  }
}
