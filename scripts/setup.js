#!/usr/bin/env node
import { spawn } from 'child_process';

const styles = {
  success: { open: '\u001b[32;1m', close: '\u001b[0m' },
  error: { open: '\u001b[31;1m', close: '\u001b[0m' },
  info: { open: '\u001b[36;1m', close: '\u001b[0m' },
  note: { open: '\u001b[2;1m', close: '\u001b[0m' },
};

const color = (modifier, string) => {
  return styles[modifier].open + string + styles[modifier].close;
};

const success = (txt) => console.log(color('success', txt));
const error = (txt) => console.error(color('error', txt));
const info = (txt) => console.log(color('info', txt));
const note = (txt) => console.log(color('note', txt));

info('Starting the setup. Please wait until all packages are completed.');

const client = spawn('pnpm install', { stdio: 'inherit', shell: true });

const server = spawn('cd ./server && pnpm install', {
  stdio: 'inherit',
  shell: true,
});

const createPromise = () => {
  let promise;
  let resolve;
  let reject;

  promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return [promise, resolve, reject];
};

const [clientPromise, clientPromiseResolve] = createPromise();
const [serverPromise, serverPromiseResolve] = createPromise();

client.on('spawn', () => {
  note('Installing client-side dependencies...');
});
server.on('spawn', () => {
  note('Installing server-side dependencies...');
});

client.on('error', (e) => {
  error('Client installation failed');
  console.error(e);
});

server.on('error', (e) => {
  error('Server installation failed');
  console.error(e);
});

client.on('exit', () => {
  note('Client-side dependencies installed.');
  clientPromiseResolve();
});

server.on('exit', () => {
  note('Server-side dependencies installed.');
  serverPromiseResolve();
});
(async () => {
  try {
    await Promise.all([clientPromise, serverPromise]);
    success('✔️  Setup complete.');
  } catch (error) {
    error('There was a problem during the setup.');
    console.error(error);
    process.exit(error.status || error.code);
  }
})();
