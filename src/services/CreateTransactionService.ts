import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import GetCategoryIdService from './GetCategoryIdService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // TODO
    const transactionRepository = getRepository(Transaction);

    const getCategoryId = new GetCategoryIdService();

    const category_id = await getCategoryId.execute(category);

    const transaction = transactionRepository.create({
      category_id,
      title,
      type,
      value,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
