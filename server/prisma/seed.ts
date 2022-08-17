import { createQuote } from '../src/modules/quotes/quotes.service';
import { quotes } from '../src/__mocks__/quotes.json';

const seed = async () => {
  try {
    console.log('Seeding...');
    for (const quote of quotes) {
      await createQuote(quote);
    }

    console.log('Seeding successfull');
  } catch (error) {
    throw new Error('Failed to seed database');
  }
};

seed();
