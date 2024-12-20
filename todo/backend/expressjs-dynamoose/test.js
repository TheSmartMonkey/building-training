import dynamoose from 'dynamoose';
import { getAllTodos } from './todo.js';

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: 'eu-west-3',
});

dynamoose.aws.ddb.set(ddb);

getAllTodos().then((todos) => {
  console.log(todos[0].id);
});
