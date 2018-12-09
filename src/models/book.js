const book = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    author: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    currentChapter: { type: DataTypes.INTEGER },
    chapters: { type: DataTypes.INTEGER },
    currentPage: { type: DataTypes.INTEGER },
    pages: { type: DataTypes.INTEGER }
  })

  Book.associate = models => {
    Book.belongsTo(models.User)
  }

  return Book
}

export default book
