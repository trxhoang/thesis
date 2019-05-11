import Sequelize from 'sequelize';
import UserModel from './models/user';

const sequelize = new Sequelize({
  database: 'testing',
  username: 'admin',
  password: '1234',
  dialect: 'mysql',
});

export const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log('Users db and user table have been created');
});