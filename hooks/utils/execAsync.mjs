const { promisify } = require('util');
const { exec } = require('child_process');

export default () => promisify(exec);