const r_s = str => str.replace("'","\\'")

const mdfs_str = {
  "=": (v1,v2  ) => v1 + "==" + v2,
  ">": (v1,v2  ) => v1 + ">=" + v2,
  "<": (v1,v2  ) => v1 + "<=" + v2,
  "?": (v1,v2,i) => i ? `/${ rep(v2)}/${ i}.test(${v1})` : v1 + `.includes('${   r_s(v2) }')`,
  "^": (v1,v2,i) => i ? `/^${rep(v2)}/${ i}.test(${v1})` : v1 + `.startsWith'(${ r_s(v2) }')`,
  "$": (v1,v2,i) => i ? `/${ rep(v2)}$/${i}.test(${v1})` : v1 + `.endsWith('${   r_s(v2) }')`,
  "~": (v1,v2,i) => i ? `/ ${rep(v2)} /${i}.test(${v1})` : v1 + `.includes(' ${  r_s(v2) } ')`,
}


let params = [
  [ "id > !",   "196"  ],
  [ "userId",   "10"   ],
  [ "completed", false ]
]

// http://localhost:3000/foo/get?id>!=196&userId=10&completed=false&_select=

let keys = ["id", "title"]

keys = keys.map(key => `${key}:$obj.${key}`)






let get_comp = []
let arg = keys ? "" : "$obj"
let cnd = ""

if (keys) {
  
}

for (let [key, val] of params) {
  let m = ""
  key = key.replace(/\W+/, $ => (m = $, ""))

  let n = false;
  let i = false;

  m = m.replace("!", () => (n = "!", ""))
  m = m.replace("*", () => (i = "*", ""))
  m = m.trim()

  let c = mdfs_str[m || "="]("$obj." + key, val, i)
  
  cnd += (n ? `!(${c})` : c) + "&&"
}

arg = keys ? `{${arg.slice(0, -1)}}` : `{${arg}}`
cnd = `(${cnd.slice(0, -2)})`
keys = keys || "$obj"

let fn = Function(
  "$obj", "$res",
  `if (${cnd}) $res.push({${keys}})`
)

let result = [];

for (const obj of require("./fake.json")) {
  fn(obj, result)
}


console.log(result)