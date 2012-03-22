(function () {
    "use strict";

    var token = "";
   
    function firstP() {
        var uri = "https://api.foursquare.com/v2/venues/suggestCompletion?ll=40.7,-74&query=foursqu&oauth_token=" + token + "&v=20120318";
        WinJS.xhr({ url: uri }).then(
            function (result) {
                var resultParse = JSON.parse(result.responseText);
                Debug.print("Parsed JSON object \r\n");
            },
            function (err) {
                Debug.print("Error in firstP: " + err + "\r\n");
            });
    }

    function authenticate() {
        launchFoursquareWebAuth();
    }

    function launchFoursquareWebAuth() {

        var FoursquareURL = "https://foursquare.com/oauth2/authenticate?client_id=";
        var clientID = "RLMQ32KUYEOX0QELH0VKXTSWMTRIEFADZQDUG1AHD3ACTCZD";
        var callbackURL = "http://www.lazysuhail.com";     

        FoursquareURL += clientID + "&response_type=token&redirect_uri=" + encodeURIComponent(callbackURL);

        try {
            var startURI = new Windows.Foundation.Uri(FoursquareURL);
            var endURI = new Windows.Foundation.Uri(callbackURL);

            Debug.print("Navigating to: " + FoursquareURL + "\r\n");
            Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
                                                        Windows.Security.Authentication.Web.WebAuthenticationOptions.none,
                                                        startURI,
                                                        endURI).then(callbackFoursquareWebAuth, callbackFoursquareWebAuthError);
        } catch (err) {
            Debug.print("Error launching WebAuth" + err);
            return;
        }

    }

    function callbackFoursquareWebAuth(result) {

        Debug.print(result.responseData);
        token = result.responseData.slice(40);
        Debug.print("Status returned by WebAuth broker: " + result.responseStatus + "\r\n");
        if (result.responseStatus === 2) {
            Debug.print("Error returned: " + result.responseErrorDetail + "\r\n");
        }
    }

    function callbackFoursquareWebAuthError(err) {

        Debug.print("Error returned by WebAuth broker: " + err);
    }

    WinJS.Namespace.define("Foursquare", {
        firstP: firstP,
        authenticate: authenticate

    });
})();