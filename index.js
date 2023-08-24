console.clear();



const http = require("http");
const fs   = require("fs");



if (!fs.existsSync(`${__dirname}/data`)){
  fs.mkdirSync(`${__dirname}/data`);
}



let db;
let req;
let res;


const host = "http://localhost:3000";
const er = {
  body: "err: body only object format",
  post: "err: only POST requests for set",
  file: "err: this file does not exist",
  url: "err: invalid url",
}



function getPath(file) {
  return `${__dirname}/data/${file}.json`
}

// function sendErr(err, res) {
//   console.log(err);
//   res.end(err)
// }

async function getBody(req) {
  const type = req.headers['content-type']
  let body = await new Promise((res) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk + ""));
    req.on("end", () => res(body));
  });

  if (body) {
    if (type === "application/json") {
      return JSON.parse(body)
    }
    if (type === "application/x-www-form-urlencoded") {
      console.log(type);
      const obj = {};
      body.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        obj[key] = decodeURIComponent(value.replace(/\+/g, ' '));
      });
      console.log(obj);
      return obj;
    }
  }
}







const func = {
  create({ file }) {
    if (fs.existsSync(getPath(file))) {
      return `"${file}" already exists`;
    }
    fs.writeFileSync(getPath(file), JSON.stringify([]));
    return `"${file}" was created successfully`;
  },

  // *********************************************************

  get({ params, paramsRaw }) {
    if (!paramsRaw) {
      return JSON.stringify(db)
    }
    // const [[fk,fv],[kk,kv]] = params

    // console.log( params );
    let fields = {}

    for (const [key, val] of params) {
      console.log([key, val]);
      
      if (key[0] == "f:") {
        let fl = key.split(":")[1]
        fields

      }
    }

    return ""
  },

  // *********************************************************

  set({ req, body, file }) {
    if (req.method !== 'POST') return er.post
    db.push(body);
    fs.writeFileSync(getPath(file), JSON.stringify(db));
    return "ok"
  },

  // *********************************************************

  upd() {},

  // *********************************************************
  
  del() {},
};




const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // console.log([req.headers]);

  try {
    if (req.url == "/favicon.ico") {
      res.end("");
      return;
    }
  
    let { pathname, searchParams, search } = new URL(host + req.url);
    let [ file, method ] = pathname.split("/").filter((e) => e);
    let body;
    
    try {
      if (method !== "create") {
        db = JSON.parse(fs.readFileSync(getPath(file), "utf8"))
      }
    } catch (error) {
      res.statusCode = 400;
      if (!file) {
        return res.end(er.url)
      }
      return res.end(er.file)
    }


  
    try {
      body = await getBody(req);
      
    } catch (error) {
      res.statusCode = 400;
      return res.end(er.body)
    }
  
  
  
    // db = JSON.parse(db)
  
    res.end( JSON.stringify(func[method]?.(
      { req, res, file, params: searchParams, paramsRaw: search, body }
    ) || er.url) )
  } catch (error) {
    res.statusCode = 400;
    res.end("something went wrong")
    console.log(error);
  }
});



server.listen(3000, () => console.log(host))