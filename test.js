console.log('start');

let o = {
  count: 0,
  get c() {
    return this.count++
  }
}


let org = 0;
Object.defineProperty(window, 'a', {
  get() {
    return org++
  }
})
  ;
function mono() {
  let count = 0;
  return function () {
    return count++
  }
}
let a = mono()

let count = a()