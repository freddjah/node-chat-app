const generateMessage = (from, text) => {
  const date = new Date()

  return {
    from,
    text,
    createdAt: `${date.toLocaleDateString('sv-SV')} ${date.toLocaleTimeString('sv-SV')}`
  }
}

module.exports = {
  generateMessage
}