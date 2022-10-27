function test() {
    console.log(hello);
}
function caller(fn) {
    fn()
}

var hello = 1
caller(test)
hello = 2
caller(test)
hello = 1
caller(test)