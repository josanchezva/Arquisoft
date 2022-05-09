import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true })
  UserID: number;
  @Prop({ required: true })
  ListName: string;
  @Prop()
  VideogameID: string[];
}

export const ListSchema = SchemaFactory.createForClass(List);
