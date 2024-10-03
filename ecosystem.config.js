module.exports = {
  apps: [
    {
      name: 'gateway',
      script: 'npx',
      args: 'nest start gateway',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'redis',
      script: 'npx',
      args: 'nest start redis',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'create',
      script: 'npx',
      args: 'nest start create',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'read',
      script: 'npx',
      args: 'nest start read',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'update',
      script: 'npx',
      args: 'nest start update',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'delete',
      script: 'npx',
      args: 'nest start delete',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
