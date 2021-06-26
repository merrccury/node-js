const redis = require("redis");
const password = "a6W1eXMcNDtACJP56aUp1mMoaYfZET0t";
const endpoint = "//redis-18034.c61.us-east-1-3.ec2.cloud.redislabs.com:18034";
const client = redis.createClient(endpoint, {password: password});

client.on("ready", () => console.log("ready"));
client.on("error", (err) => console.log(err));
client.on("end", () => console.log("disconnected"));
client.on("subscribe", (channel, count) =>
    console.log("subscribe:", " channel = ", channel, " count = ", count));
client.on("message", (channel, message) =>
    console.log("sub channel: ", channel, ": ", message));


let set = (client, n) => client.set(n, `set${n}`);
let get = (client, n) => client.get(n
    //, (err, res) => err ? console.log(err) : console.log(res)
);
let del = (client, n) => client.del(n);
let incr = (client, key) => client.incr(key);
let decr = (client, key) => client.decr(key);
let hset = (client, n) =>
    client.hset("num", n,
        JSON.stringify({
            id: n,
            val: `val-${n}`
        }));
let hget = (client, n) =>
    client.hget("num", n
        //,(err, res) => err ? console.log(err) : console.log(res)
    );


let resolver = (client, count, call) => {
    for (let i = 0; i < count; i++)
        call(client, i);
}

let resolverKey = (client, count, key, call) => {
    for (let i = 0; i < count; i++)
        call(client, key);
}

client.on("connect", () => {
    console.time("set");
    resolver(client, 10000, set);
    console.timeEnd("set");

    console.time("get");
    resolver(client, 10000, get);
    console.timeEnd("get");

    console.time("del");
    resolver(client, 10000, del);
    console.timeEnd("del");

    client.set("incr", 0);

    console.time("incr");
    resolverKey(client, 10000, "incr", incr);
    console.timeEnd("incr");

    client.get("incr", (err, res) => err ? console.log(err) : console.log(res));

    console.time("decr");
    resolverKey(client, 10000, "incr", decr);
    console.timeEnd("decr");

    client.get("incr", (err, res) => err ? console.log(err) : console.log(res));


    console.time("hset");
    resolver(client, 10000, hset);
    console.timeEnd("hset");

    console.time("hget");
    resolver(client, 10000, hget);
    console.timeEnd("hget");

    client.subscribe("channel-1");
});
