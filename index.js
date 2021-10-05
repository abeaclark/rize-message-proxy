require('dotenv').config()
const { Rize } = require('rize-js');
const rize = new Rize(process.env.RIZE_PROGRAM_ID, process.env.RIZE_HMAC_KEY);

const rmqClient = rize.rmq.connect(
  process.env.RIZE_RMQ_HOSTS,
  process.env.RIZE_RMQ_CLIENT_ID,
  'Customer',
  process.env.RIZE_RMQ_USERNAME,
  process.env.RIZE_RMQ_PASSWORD,
);


rmqClient.on('connecting', function (connector) {
    const address = connector.serverProperties.remoteAddress.transportPath;

    console.log('Connecting to ' + address);
});

rmqClient.on('connect', function (connector) {
    const address = connector.serverProperties.remoteAddress.transportPath;

    console.log('Connected to ' + address);
});

rmqClient.on('error', function (error) {
    const connectArgs = error.connectArgs;
    const address = connectArgs.host + ':' + connectArgs.port;

    console.log('Connection error to ' + address + ': ' + error.message);
});

