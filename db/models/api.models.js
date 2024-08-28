const fs = require('fs/promises');
const path = require('path');

const selectApiEndpoints = () => {
  const filePath = path.join(__dirname, '../../endpoints.json');
  return fs.readFile(filePath, 'utf-8').then((data) => {
    return JSON.parse(data);
  });
};

module.exports = { selectApiEndpoints };