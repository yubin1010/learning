module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>Todolist - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/todos/${filelist[i].title}"</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
