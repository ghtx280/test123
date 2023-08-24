"/test/create" ? "created" : "already exist"

// /test/new

({
  "method": "POST",
  "body": {
    "str": "foo",
    "num": 20,
    "arr": [523, "baz"],
    "obj": { "key": "hello" }
}
})


// /test/get 

"/"
// all

"/?i=5"
// index == 5

"/?i=5,8"
// index 5 and 8

"/?i=5-8"
// index from 5 to 8

"/?i=>5"
// index >= 5

"/?i=<5"
// index <= 5

"/?i=5&k=foo,baz"
// index == 5 (select keys only foo and baz)

"/?f:id=5"
// id == 5

"/?f:obj.key=5"
// obj["key"] == 5

"/?f:arr.0=5"
// arr["0"] == 5

"/?f:id=>5"
// id >= 5


// /test/upd

"/?f:id=5"
({
  method: "PATCH",
  body: {
    str: "not foo"
  }
})

// http://localhost:3000/test/get?f:str=foo
























const db = require("boodb").create("./db/")

const posts = db.from("posts.json")

let [ data ] = await posts.get('*')

posts.get(['*'])
// [{id: 1, title: "test1", body: "Lorem ipsum"}, {...}, {...}]

posts.get(['title'])
// [{title: "test1"}, {...}, {...}]

posts.get(['title', 'body'])
// [{title: "test1", body: "Lorem ipsum"}, {...}, {...}]

posts.get({ id: 1 })
// [{id: 1, title: "test1", body: "Lorem ipsum"}]

posts.get({ id: 1 }, ['title', 'body'])
// [{title: "test1", body: "Lorem ipsum"}]

posts.get({ id: '1, 3' }, ['id'])
// [{id: 1}, {id: 3}]

posts.get({ id: '[1, 3]' }, ['id'])
// [{id: 1}, {id: 2}, {id: 3}, {id: 4}]

posts.get({ views: '> 100' }, ['id'])
// [{id: 3}, {id: 4}]

posts.get({ views: '< 100' }, ['id'])
// [{id: 1}, {id: 2}]

posts.get({ title: "? Lorem" }, ['id'])
// [{id: 1}]

posts.get({ title: "?i lorem" }, ['id'])
// [{id: 1}]














posts.get()
// [{id: 1, title: "test1", body: "Lorem ipsum"}, {...}, {...}]

posts.get({ title: {} })
// [{title: "test1"}, {...}, {...}]

posts.get({ title: {}, body: {} })
// [{title: "test1", body: "Lorem ipsum"}, {...}, {...}]

posts.get({ id: 1 })
// [{id: 1, title: "test1", body: "Lorem ipsum"}]

posts.get({ id: 1, title: {} })
// [{title: "test1", body: "Lorem ipsum"}]

posts.get({ id: { $range: [1, 3] } })
// [{id: 1}, {id: 3}]

posts.get({ id: '[1, 3]' }, 'id')
// [{id: 1}, {id: 2}, {id: 3}, {id: 4}]

posts.get({ views: '> 100' }, 'id')
// [{id: 3}, {id: 4}]

posts.get({ views: '< 100' }, 'id')
// [{id: 1}, {id: 2}]

posts.get({ title: "! Lorem" }, 'id')
// [{id: 1}]

posts.get({ title: "? lorem" }, 'id')
// [{id: 1}]

{
  tags: ['mama', 'papa', 'syn', 'dochka']
}

posts.get({ tags: "[ lorem" }, 'tags')
// [{id: 1}, {id: 3}]





















posts.get() // all

posts.get('2') // with index 2

posts.get('-3') // 3th element at the back

posts.get('1, 3') // with index 1 and 3

posts.get('[1, 3]') // range between 1 and 3 indexes

posts.get({ id: '3' }) // all posts with field 'id' == 3

posts.get({ id: '> 3' }) // all posts with field 'id' >= 3

posts.get({ id: '< 3' }) // all posts with field 'id' <= 3


"/posts/"

posts.get({
  posts: {
    0: 2
  }
})



















// const db = boodb.create("./db.json")
// or 
// const db = boodb.connect("https:localhost:8080","password")

// db.define("posts");

// db.define("posts", {
//   id: "primary",
//   user: "string",
//   age: {
//     type: "number",
//     default: 0,
//     check: (val) => val < 150 && val > 0,
//   },
//   rating: {
//     type: "number",
//     check: (val) => val < 150 && val > 0,
//   },
// });

// /* posts: [] */

// let posts = db.table("posts");

// ("http://localhost:8080/posts");

// // Get by index

// db.table("posts").get(), "?get=*"; // all posts
// db.table("posts").get(0), "?get=0"; // post with index 0
// db.table("posts").get(-1), "?get=-1"; // last post
// db.table("posts").get(2, 5), "?get=2,5"; // range of posts, from index 2 to 5

// // Add new record

// posts.push({ user: "Alex", age: 23 }), "/push";
// // body {"user":"Alex","age":23}

// // Filtering

// posts.filter((e) => e.id == 5).get();
// ("?filter=e=>e.id==5&get=*");
// posts.filter((e) => e.id == 5).set({ name: "Jack" });

// let body = {
//   filter: "e => e.id === 5",
//   get: "",
// };

// let posts = db.table("posts")