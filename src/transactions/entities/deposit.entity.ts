export class Deposit {
    cpf:string;

    value:number;

    constructor(transac?: Partial<Deposit>){
        this.cpf = transac.cpf;
        this.value = transac.value;
    }
}

