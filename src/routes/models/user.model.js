const posts = require('../data/posts.json');
const filename = '../data/posts.json';
const helper = require('../helpers/helper.js');

function getPosts() {
    return new Promise((resolve, reject) => {
        if(posts.length === 0) {
            reject({ 
                message: `No posts available`,
                status: 202
            });
        }
        resolve(posts);
    });
}

function getPost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(error => reject(error));
    });
}

function createPost(newPost, ID) {
    return new Promise((resolve, reject) => {
        const id = { ID };
        newPost = { ...id, ...newPost };
        posts.push(newPost);
        helper.writeJSONFile(filename, posts);
        resolve(newPost);
    });
}

function updatePost(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id === post.id);
            id = { id: post.id };
            posts[index] = { ...id, ...newPost };
            helper.writeJSONFile(filename, posts);
            resolve(posts[index]);
        })
        .catch(error => reject(error));
    });
}

function deletePost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(() => {
            posts = posts.filter(p => p.id !== id);
            helper.writeJSONFile(filename, posts);
            resolve();
        })
        .catch(error => reject(error));
    });
}

module.exports = { getPost, getPosts, createPost, updatePost, deletePost };