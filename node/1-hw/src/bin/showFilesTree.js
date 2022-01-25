#!/usr/bin/env node

import { program } from 'commander';

import showTree from '../index';

program
  .option('-d, --depth [type]', 'Depth tree', '2')
  .arguments('<pathToDir>')
  .action((pathToDir, { depth }) => console.log(showTree(pathToDir, depth)))
  .parse();
