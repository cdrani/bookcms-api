import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  { dialect: 'postgres' }
)

const models = {
  User: sequelize.import('./user'),
  Book: sequelize.import('./book')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models

// let users = {
//   sdjlafjsd: {
//     id: 'sdjlafjsd',
//     username: 'spinelli',
//     email: 'spinell@gmail.com',
//     password: 'spinellitortellini',
//     bookIds: ['woeurweq']
//   },
//   ldsjafjls: {
//     id: 'ldsjafjls',
//     username: 'vlassel',
//     email: 'vlassel@gmail.com',
//     password: 'lasseltassel',
//     bookIds: ['sjcnvkjlj']
//   }
// }

// let books = {
//   woeurweq: {
//     id: 'woeurweq',
//     userId: 'sdjlafjsd',
//     author: 'Ashley Spinell',
//     title: '4th Grade War Stories',
//     currentChapter: 5,
//     chapters: 12,
//     currentPage: 79,
//     pages: 231
//   },
//   sjcnvkjlj: {
//     id: 'sjcnvkjlj',
//     userId: 'ldsjafjls',
//     author: 'Vince Lassel',
//     title: 'School Legend',
//     currentChapter: 8,
//     chapters: 15,
//     currentPage: 153,
//     pages: 275
//   }
// }

// export default { users, books }
