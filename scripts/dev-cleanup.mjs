import { existsSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const mode = process.argv[2] ?? 'full';
const webPorts = Array.from({ length: 11 }, (_, idx) => 3000 + idx);
const ports = mode === 'web' ? webPorts : [5432, 8969, ...webPorts];

const run = (command) => {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return '';
  }
};

const getPidsByPortWindows = (port) => {
  const output = run(`netstat -ano -p tcp | findstr :${port}`);
  const lines = output
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .filter(line => line.includes('LISTENING'));

  return lines
    .map((line) => {
      const parts = line.split(/\s+/);
      const pid = Number(parts.at(-1));
      return Number.isInteger(pid) ? pid : null;
    })
    .filter(pid => pid !== null);
};

const getPidsByPortPosix = (port) => {
  const output = run(`lsof -ti tcp:${port}`);
  return output
    .split('\n')
    .map(line => Number(line.trim()))
    .filter(pid => Number.isInteger(pid));
};

const killPidWindows = (pid) => {
  run(`taskkill /PID ${pid} /F /T`);
};

const killPidPosix = (pid) => {
  run(`kill -9 ${pid}`);
};

const isWindows = process.platform === 'win32';
const pidSet = new Set();

for (const port of ports) {
  const pids = isWindows ? getPidsByPortWindows(port) : getPidsByPortPosix(port);
  pids.forEach(pid => pidSet.add(pid));
}

for (const pid of pidSet) {
  if (pid !== process.pid) {
    if (isWindows) {
      killPidWindows(pid);
    } else {
      killPidPosix(pid);
    }
  }
}

const lockFilePath = path.join(process.cwd(), '.next', 'dev', 'lock');
if (existsSync(lockFilePath)) {
  rmSync(lockFilePath, { force: true });
}

if (pidSet.size > 0) {
  console.log(`dev cleanup (${mode}): terminated ${pidSet.size} stale process(es).`);
} else {
  console.log(`dev cleanup (${mode}): no stale processes found on target ports.`);
}
