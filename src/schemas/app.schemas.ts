import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EncryDoc = EncryClass & Document;

@Schema()
export class EncryClass{
    @Prop({required: true})
    id: number;

    @Prop({required: true})
    userDocument: string;

    @Prop({required:true})
    creditCardToken: string;
    
    @Prop({required: true})
    value: number;
}

export const EncrySchema = SchemaFactory.createForClass(EncryClass);