import { ApiProperty } from "@nestjs/swagger";

export class DepositTransactionDto {
    @ApiProperty()
    cpf: string;

    @ApiProperty()
    value:number;
}
