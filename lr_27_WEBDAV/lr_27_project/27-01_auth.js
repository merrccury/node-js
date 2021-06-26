const {AuthType, createClient} = require('webdav');

const client = createClient('https://webdav.yandex.ru', {
    authType: AuthType.Digest, username: "dmitry.alekseichik",
    password: "mmgwneinpcjjeyvk"
});

client.exists('/new')
    .then(result => {
        console.log(result);
    });