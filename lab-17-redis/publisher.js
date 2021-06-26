const redis = require("redis");
const password = "a6W1eXMcNDtACJP56aUp1mMoaYfZET0t";
const endpoint = "//redis-18034.c61.us-east-1-3.ec2.cloud.redislabs.com:18034";
const client = redis.createClient(endpoint, {password: password});

client.publish("channel-1", "Hello From Channel #1");

client.quit();