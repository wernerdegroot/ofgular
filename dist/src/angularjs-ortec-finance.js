define("Test/GetIt", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.rups = 4;
});
define("OtherTest", ["require", "exports", "Test/GetIt"], function (require, exports, GetIt_1) {
    "use strict";
    exports.name = 'Werner' + GetIt_1.rups;
});
define("Test/Test", ["require", "exports", "OtherTest"], function (require, exports, OtherTest_1) {
    "use strict";
    console.log(OtherTest_1.name);
});
