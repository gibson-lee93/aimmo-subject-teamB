import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop()
  author: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment'})
  parentComment: Comment | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);