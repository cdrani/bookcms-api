const book = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    author: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    currentChapter: { type: DataTypes.INT },
    chapters: { type: DataTypes.INT },
    currentPage: { type: DataTypes.INT },
    pages: { type: DataTypes.INT }
  })

  Book.associate = models => {
    Book.belongsTo(models.User)
  }

  return Book
}

export default book
