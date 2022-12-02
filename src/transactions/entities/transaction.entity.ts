export class Transaction {
    senderCpf:string;

    receiverCpf:string;

    value:number;

    constructor(transac?: Partial<Transaction>){
        this.senderCpf = transac.senderCpf;
        this.receiverCpf = transac.receiverCpf;
        this.value = transac.value;
    }
}
