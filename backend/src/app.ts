/* eslint-disable @typescript-eslint/no-unused-vars */

import { stringify } from 'node:querystring';
import { parseResponse } from './helpers/request';
import { Request } from './modules/access-layer/request';
import {
  setupCli,
  setupPersistentDb,
  setupErrorHandle,
  setupExpress,
  setupValidateEnv,
  setupCacheDb,
} from './setup';

function test() {}

/* eslint-disable @typescript-eslint/require-await */

async function init() {
  console.dir(process.env);

  setupValidateEnv();
  setupErrorHandle();
  setupCli();
  await setupCacheDb();
  await setupPersistentDb();
  setupExpress();

  test();
  //  setupDashboard();
}

void init();
