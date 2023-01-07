import monk from 'monk';

const db = monk(process.env.MONGO_URI as string);

if (db !== undefined) {
  console.log('Connected to DB Successfully!');
} else {
  console.log('Connection with DB Failed!');
}

export default db;
