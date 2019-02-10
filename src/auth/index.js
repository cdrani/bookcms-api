import jwt from 'jsonwebtoken'

const signToken = async ({ id, email, username }, secret, expiresIn) =>
  await jwt.sign({ id, email, username }, secret, { expiresIn })

const verifyToken = async (refreshToken, refreshSecret) =>
  await jwt.verify(refreshToken, refreshSecret)

export const createTokens = async (user, secret, refreshSecret) => {
  const token = await signToken(user, secret, '30m')
  const refreshToken = await signToken(user, refreshSecret, '1w')
  return [token, refreshToken]
}

export const refreshTokens = async (
  User,
  token,
  refreshToken,
  secret,
  refreshSecret
) => {
  let userId = -1
  try {
    const { id } = jwt.decode(refreshToken)
    userId = id
  } catch (err) {
    return {}
  }

  if (!userId) {
    return {}
  }

  const user = await User.findOne({ where: { id: userId }, raw: true })

  if (!user) {
    return {}
  }

  const data = await verifyToken(refreshToken, refreshSecret)
  const [newToken, newRefreshToken] = await createTokens(
    user,
    secret,
    refreshSecret
  )

  return { user, newToken, newRefreshToken }
}
