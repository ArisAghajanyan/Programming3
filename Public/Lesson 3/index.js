var os = require("os")
var massage ="The platform is ";

function main() {
    console.log(massage + os.platform());    
}
main();