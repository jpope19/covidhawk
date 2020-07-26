'use strict';

require('dotenv').config();

const fs = require('fs'),
  path = require('path'),
  yaml = require('js-yaml'),
  { Client } = require('@elastic/elasticsearch'),
  HOST = process.env.FOUNDELASTICSEARCH_URL || process.env.ELASTICSEARCH_HOST,
  CLOUD_ID = process.env.ELASTICSEARCH_CLOUD_ID,
  PW = process.env.ELASTICSEARCH_PASSWORD,
  client = CLOUD_ID
    ? new Client({
        cloud: {
          id: CLOUD_ID,
        },
        auth: {
          username: 'elastic',
          password: PW
        },
      })
    : new Client({
        node: HOST,
        maxRetries: 5,
        requestTimeout: 60000,
      }),
  COVID_INDEX = 'illness',
  MAPPINGS_PATH = path.join(__dirname, 'mappings'),
  ELASTIC_MAPPINGS = fs.readdirSync(MAPPINGS_PATH) || [];

/**
 * Checks if the specified index exists in elastic
 *
 * @param {string} index
 * @returns {Promise}
 */
function checkIndexExists(index) {
  return client.indices.exists({ index }).then(({ statusCode }) => statusCode === 200);
}

/**
 * Gets default settings for an index
 *
 * @returns {Object}
 */
function getIndexSettings() {
  return {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 2,
    },
  };
}

/**
 * Post a covid case to elastic
 *
 * @param {Object} covid
 * @returns {Object}
 */
async function postCovid(body) {
  return client
    .index({
      index: COVID_INDEX,
      body,
    })
    .then(res => {
      return {
        id: res.body._id,
        body,
      };
    });
}

/**
 * Makes an update to an existing covid doc
 *
 * @param {string} id
 * @param {Object} body
 * @returns {Object}
 */
async function putCovid(id, body) {
  return client
    .index({
      index: COVID_INDEX,
      id,
      body,
    })
    .then(() => ({ id, body }));
}

/**
 * Initializes all the indices with their aliases
 *
 * @returns {Promise}
 */
async function init() {
  const connectionStatus = await client.ping();

  if (!connectionStatus) {
    throw new Error('Unable to connect Elasticsearch instance');
  }

  const indices = ELASTIC_MAPPINGS.map(mapping => ({
      alias: mapping.replace(/\.ya?ml/, ''),
      body: fs.readFileSync(path.join(MAPPINGS_PATH, mapping), 'utf8'),
    })),
    indicesPromises = indices.map(async ({ alias, body }) => {
      const index = `${alias}_v1`,
        doesExists = await checkIndexExists(index);

      if (!doesExists) {
        const { _doc, settings } = yaml.safeLoad(body),
          indexConfig = Object.assign(getIndexSettings(), {
            mappings: _doc,
            settings,
          });

        console.log(`Creating index, ${index}`);
        await client.indices.create({ index, body: indexConfig });
        
        console.log(`Creating alias, ${alias}`);
        await client.indices.putAlias({
          index,
          name: alias,
        });
      } else {
        console.log(`Could not create index, ${index}, it already exists!`);
      }
    });

  return Promise.all(indicesPromises);
}

module.exports.init = init;
module.exports.postCovid = postCovid;
module.exports.putCovid = putCovid;
