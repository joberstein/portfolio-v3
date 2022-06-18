import { basename } from 'path';
import { fileURLToPath } from 'url';

export default (filePath) => basename(filePath);