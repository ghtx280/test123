const fls = [
  ["id", "123"], // id == 123
  ["id", "% 123-125"], // id >= 123 && id <= 125
  ["id", "% 123,125"], // id == 123 && id == 125
  ["id", "> 123"], // id >= 123
  ["id", "< 123"], // id <= 123
  ["id", "? lorem"], // /lorem/gi.test(id)
  ["id", "! Lorem"], // /lorem/g.test(id)
];

const fls2 = [
  ["=:id", "123"], // id == 123
  ["%:id", "% 123-125"], // id >= 123 && id <= 125
  ["%:id", "% 123,125"], // id == 123 && id == 125
  ["f:id", "> 123"], // id >= 123
  ["f:id", "< 123"], // id <= 123
  ["f:id", "? lorem"], // /lorem/gi.test(id)
  ["f:id", "! Lorem"], // /lorem/g.test(id)
];


"id=123"     // id == 123

"id>=123"    // id >= 123
"id<=123"    // id <= 123

"txt?=lorem" // txt.includes("lorem")
"txt^=lorem" // txt.startsWith("lorem")
"txt$=lorem" // txt.endsWith("lorem")
"txt~=lorem" // txt.includes(" lorem ")

"txt?*=lorem" // /lorem/i.test(id)
"txt^*=lorem" // /^lorem/i.test(id)
"txt$*=lorem" // /lorem$/i.test(id)
"txt~*=lorem" // / lorem /i.test(id)

"id!=123"     // !(id == 123)

"txt?!=lorem" // !(txt.includes("lorem"))
"txt^!=lorem" // !(txt.startsWith("lorem"))
"txt$!=lorem" // !(txt.endsWith("lorem"))
"txt~!=lorem" // !(txt.includes(" lorem "))

"txt?*!=lorem" // !(/lorem/i.test(id))
"txt^*!=lorem" // !(/^lorem/i.test(id))
"txt$*!=lorem" // !(/lorem$/i.test(id))
"txt~*!=lorem" // !(/ lorem /i.test(id))

const rep = str => str.replace(/\W/g, "\\$&")
const reg = (str, i) => new RegExp(str, i)

const mdfs_obj = {
  "=": (k,v  ) => k == v,
  ">": (k,v  ) => k >= v,
  "<": (k,v  ) => k <= v,
  "?": (k,v,i) => i ? reg(     rep(v)   , i).test(k) : k.includes(v),
  "^": (k,v,i) => i ? reg( `^${rep(v)}` , i).test(k) : k.startsWith(v),
  "$": (k,v,i) => i ? reg(  `${rep(v)}$`, i).test(k) : k.endsWith(v),
  "~": (k,v,i) => i ? reg( ` ${rep(v)} `, i).test(k) : k.includes(` ${v} `),
}

let mdfs = key.match(/\W+/)[0]

const kys = [
  "title"
];

let result = [];



function foo(e, result) {
  // console.log(e.id > 123 && e.userId == 9);
  if (e.id == 123) {
    result.push({"title": e.title})
  }
}

let get = [
  ["id>","5"]
]

require("./fake.json").forEach((obj) => {
  foo(obj, result)
});
console.log(result)





// const fn = Function(`

// `);






// {"fnm":"eee","lnm":123,"eml":true}
