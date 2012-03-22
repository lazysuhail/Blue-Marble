(function () {
    "use strict";

    function print(str) {
        var output = document.getElementById("debugContainer");
        output.innerHTML = output.innerText + "<br> " + str;
    }

    WinJS.Namespace.define("Debug", {
        print: print
    });
})();