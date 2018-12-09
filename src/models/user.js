const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
  })

  User.associate = models => {
    User.hasMany(models.Book, { onDelete: 'CASCADE' })
  }

  return User
}

export default user
