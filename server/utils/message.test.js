const expect = require('expect')

const { generateMessage } = require('./message')

describe('generateMessage generate message', () => {
  it('should generate correct message', () => {
    const from = 'Alex'
    const text = 'Hello world!'

    const msg = generateMessage(from, text)

    expect(msg.from).toBe(from)
    expect(msg.text).toBe(text)
    expect(msg.createdAt).toBeA('number')
  })
})