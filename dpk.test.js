const { deterministicPartitionKey } = require('./dpk');
const crypto = require('crypto');

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe('0');
  });

  it('Returns the correct key when the event has a partitionKey value', () => {
    const event = {
      partitionKey: 'testValue',
    };

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(event.partitionKey);
  });

  it('Return type is a string if partitionKey is not a string', () => {
    const event = {
      partitionKey: 1998,
    };

    const trivialKey = deterministicPartitionKey(event);

    expect(typeof trivialKey).toBe('string');
  });

  it('Returns the hashed value of the event when event has no partitonKey value', () => {
    const event = {
      testKey: 'testValue',
    };

    const eventString = JSON.stringify(event);
    const hashedEvent = crypto
      .createHash('sha3-512')
      .update(eventString)
      .digest('hex');

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(hashedEvent);
  });

  it('Returns the hashed value of the partitionKey when the partitionKey is too long', () => {
    const event = {
      partitionKey: 'a'.repeat(257),
    };

    const hashedEvent = crypto
      .createHash('sha3-512')
      .update(event.partitionKey)
      .digest('hex');

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(hashedEvent);
  });
});
