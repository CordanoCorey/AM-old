// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export interface Environment {
  name: 'LOCAL' | 'PROD' | 'STAGING' | 'TEST' | 'DEV';
  dev: boolean;
  test: boolean;
  staging: boolean;
  production: boolean;
  apiBase: 'http://localhost:5000/api';

}
export const environment: Environment = {
  name: 'LOCAL',
  dev: false,
  test: false,
  staging: false,
  production: false,
  apiBase: 'http://localhost:5000/api'
};
