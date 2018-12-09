const book = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    currentChapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    chapters: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    currentPage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    }
  })

  Book.associate = models => {
    Book.belongsTo(models.User)
  }

  return Book
}

export default book
