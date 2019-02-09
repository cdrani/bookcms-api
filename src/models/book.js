const book = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    author: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    chapters: {
      type: DataTypes.INTEGER
    },
    pages: {
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.STRING
    },
    currentChapter: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    currentPage: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  })

  Book.associate = models => {
    Book.belongsTo(models.User)
  }

  return Book
}

export default book
