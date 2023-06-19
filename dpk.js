const crypto = require('crypto');

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = determineCadidate(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hashData(candidate);
  }

  return candidate;
};

const determineCadidate = (event) => {
  let candidate = event.partitionKey || hashData(JSON.stringify(event));

  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  return candidate;
};

const hashData = (data) => {
  return crypto.createHash('sha3-512').update(data).digest('hex');
};
