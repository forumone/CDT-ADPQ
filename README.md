# California Department of Technology Agile Development Pre-Qualified Pool

## Running locally
1. Clone the repository: `git clone git@github.com:forumone/CDT-ADPQ.git`
2. Install NPM dependencies: `npm install`
3. Ensure that Bower and Grunt are installed globally: `npm install -g bower grunt-cli` -- note that this may require elevated privileges
4. Build and launch the application: `grunt`
5. View the application at `http://localhost:3333`

## Configuration file
The application expects to have either a configuration file at `/config/config.json` or a set of environment variables to connect to Parse and ElasticSearch. An example of the format can be found in `/config/example.config.json`. The environment variables are:
* `PARSE_APPLICATION_ID` -- Parse Application ID
* `PARSE_JAVASCRIPT_KEY` -- Parse JavaScript key
* `PARSE_SERVER_URL` -- Parse Server URL
* `PARSE_MASTER_KEY` -- Parse Master Key
* `ELASTICSEARCH_HOST` -- ElasticSearch host
* `ELASTICSEARCH_HTTP_AUTH` -- ElasticSearch HTTP authentication

## Server setup
The application expects to be deployed using Parse and ElasticSearch. To initialize the various Classes and indices run `npm initialize`. With the configuration or environment variables defined this will create the appropriate classes on Parse and indices on ElasticSearch.

The files and directories in `/cloud` are copied to the Parse `cloud` directory. Before running you will need to run `npm install` to install the appropriate packages. Configuration for ElasticSearch and SendGrid need to be added to `/cloud/cloud/app.js` and `/cloud/cloud/jobs.js`
