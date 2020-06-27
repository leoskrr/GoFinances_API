import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactions = await this.find();

    const incomeTotal = transactions.reduce(
      (accumulator, currentValue) =>
        currentValue.type === 'income'
          ? accumulator + Number(currentValue.value)
          : accumulator,
      0,
    );

    const outcomeTotal = transactions.reduce(
      (accumulator, currentValue) =>
        currentValue.type === 'outcome'
          ? accumulator + Number(currentValue.value)
          : accumulator,
      0,
    );

    const balance: Balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };

    return balance;
  }
}

export default TransactionsRepository;
