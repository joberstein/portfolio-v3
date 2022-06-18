import { basename, parse } from 'path';
import { fileURLToPath } from 'url';

export default (filePath) => parse(basename(fileURLToPath(filePath)));