const bcrypt = require('bcrypt');

exports.hashText = async (text) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(text, salt);
};

exports.compareText = async (text, originalText) => {
  const result = await bcrypt.compare(text, originalText);

  return result;
};