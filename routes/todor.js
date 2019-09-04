var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var db = require('./lib/db.js');
var shortid = require('shortid');

var title = 'create';
var list = template.list(request.list);
var html = template.HTML(title, list, `
    <form action="/todos/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');
response.send(html);

router.post('/create_process', function (request, response) {
var post = request.body;
var title = post.title;
var id = shortid.generate();
db.get('todos').push({
  id: id,
  todos: todos,
}).write();
response.redirect(`/todos/${id}`);
});

router.get('/update/:pagetd', function (request, response) {
  var topic = db.get('todos').find({todos: request.params.pagetd}).value();
  var title = topic.title;
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
        <form action="/todos/update_process" method="post">
          <input type="hidden" name="id" value="${topic.id}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
    `<a href="/todos/create">create</a> <a href="/todos/update/${topic.id}">update</a>`
  );
  response.send(html);
});

router.post('/update_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;
  db.get('todos').find({title:title}).assign({
    todos:todos
  }).write();
  response.redirect(`/todos/${topic.id}`);
});

router.post('/delete_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;
  db.get('todos').remove({title:title}).write();
  response.redirect(`/todos/${topic.id}`);
});

router.get('/:pageId', function (request, response, next) {
  var topic = db.get('todos').find({
    todos: request.params.pagetd
  }).value();
  var sanitizedTitle = sanitizeHtml(topic.title);
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
    <h2>${title}</h2>
    `,
    ` <a href="/todos/create">create</a>
            <a href="/todos/update/${topic.id}">update</a>
            <form action="/todos/delete_process" method="post">
              <input type="hidden" name="id" value="${topic.id}">
              <input type="submit" value="delete">
            </form>`
  );
  response.send(html);
});
module.exports = router;
