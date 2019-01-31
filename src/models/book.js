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
    chapters: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
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
