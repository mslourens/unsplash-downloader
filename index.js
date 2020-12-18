import {createApi} from 'unsplash-js';
import {createWriteStream} from 'fs';
import request from 'request';
import nodeFetch from 'node-fetch';
import {v4} from 'uuid';
import {config} from 'dotenv';

// load the environment variables
config();

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    secret: process.env.UNSPLASH_ACCESS_SECRET,
    timeout: 500, // values set in ms
    fetch: nodeFetch
});

function getRandomImage(query, count) {
    return unsplash
        .photos
        .getRandom({query, count})
        .then(res => res.response)
        .then(results => Promise.all(results.map((res, index) => {
            const imageName = res.description ? res.description.split(' ').join('_') : `image_${v4()}`;
            return download(res.urls.full, `images/${imageName}.png`, () => console.log('done downloading image ', index));
        })))
        .catch(err => console.error(err));
}

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url)
            .pipe(createWriteStream(path))
            .on('close', callback)
    })
}

const query = process.argv.length > 2 ? process.argv[2] : 'nature';
const count = process.argv.length > 3 ? parseInt(process.argv[3], 10) : 100;
getRandomImage(query, count);
