var initCookiePopup = function (){
    var hdxToolsCookieConsent = "hdx-tools-cookie-consent";
    var consent = $.cookie(hdxToolsCookieConsent);
    if (!consent) {
        $(".allow-cookies-container .allow-cookies-continue").click(function () {
            $.cookie(hdxToolsCookieConsent, true);
            $(".allow-cookies-container").hide();
        });
        $(".allow-cookies-container").show();
    }
};

$(document).ready(function(){
    initCookiePopup();
});
