import Sequelize from 'sequelize';
import CategoryModel from './models/category';
import NewsDetailModel from './models/news_details';

const sequelize = new Sequelize({
  host: '112.109.93.135',
  port: 36032,
  database: 'thesis',
  username: 'trxhoang',
  password: 'trxhoang@1235',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  "timezone": "+07:00",
});

export const Category = CategoryModel(sequelize, Sequelize);
export const NewsDetail = NewsDetailModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log('Users db and user table have been created');
});