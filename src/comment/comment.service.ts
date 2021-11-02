import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { Comment, CommentDocument } from './comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    const parentComment = await this.commentModel.findOne({
      _id: createCommentDto.parentCommentId
    });
    if (parentComment && parentComment.parentComment) {
      throw new BadRequestException('comment depth should be 1');
    }
    const createdComment = new this.commentModel({
      ...createCommentDto,
      author: user.username,
      parentComment: parentComment,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await createdComment.save();
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
