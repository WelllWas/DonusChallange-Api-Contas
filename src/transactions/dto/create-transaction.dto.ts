import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
    @ApiProperty()
    senderCpf: string;

    @ApiProperty()
    receiverCpf: string;
    
    @ApiProperty()
    value:number;
}
