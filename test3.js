






const rep = str => str.replace(/\W/g, "\\$&")
const reg = (str, i) => new RegExp(str, i)


const parameters = {
  "=": (v1,v2  ) => v1 == v2,
  ">": (v1,v2  ) => v1 >= v2,
  "<": (v1,v2  ) => v1 <= v2,
  "?": (v1,v2,i) => i ? reg(     rep(v2)   , i).test(v1) : v1.includes  (    v2   ),
  "^": (v1,v2,i) => i ? reg( `^${rep(v2)}` , i).test(v1) : v1.startsWith(    v2   ),
  "$": (v1,v2,i) => i ? reg(  `${rep(v2)}$`, i).test(v1) : v1.endsWith  (    v2   ),
  "~": (v1,v2,i) => i ? reg( ` ${rep(v2)} `, i).test(v1) : v1.includes  (` ${v2} `),
}


let params = [
  [ "id",   "196"  ],
  // [ "userId",   "10"   ],
  // [ "completed", false ]
]

// http://localhost:3000/foo/get?b:id.test!=123&userId=10&completed=false&_select=id,title

let keys = ["id", "title"]

let get_comp = []

for (let [key, val] of params) {
  let type = "";
  let param = "";
  let is_not = false;
  let is_insens = false;

  key = key.replace(/\W+/, $ => (param = $, ""))

  param = param.replace("!", () => (is_not    = "!", ""))
  param = param.replace("*", () => (is_insens = "*", ""))
  param = param.trim()

  console.log([key, val, is_not, is_insens, param]);

  get_comp.push({ key, val, is_not, is_insens, param })
}


let result = [];

for (const obj of require("./fake.json")) {
  // console.log(obj);
  let test = ""

  for (const {key, val, param, is_insens, is_not} of get_comp) {
    let res = parameters[param || "="](obj[key], val, is_insens)
    test = is_not ? !res : res
    console.log(test);
    if (!test) break
  }

  if (!test) continue
  
  if (keys.length) {
    let k_obj = {}
    for (const key of keys) k_obj[key] = obj[key]
    result.push(k_obj)
  }
  else result.push(obj)
}


// console.log(result)