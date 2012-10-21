var obfuscator = {
    // Generates a random number between 1 and `max`
    randomNumber: function(max) {
        return Math.floor((Math.random() * max) + 1);
    },

    // Encodes all character in an address into HTML entities
    encode: function(emailObj) {
        var newText = "";
        var text = emailObj.cleanEmail;
        for(var i = 0; i < text.length; i++) {
            newText += "&#" + text.charCodeAt(i) + ";";
        }

        emailObj.text = newText;
        emailObj.cleanEmail = newText;
    },

    // Inserts random, invisible spans into the email text
    spans: function(emailObj) {
        var newText;
        var text = emailObj.cleanEmail;
        var spansInserted = 0;
        while(spansInserted < 1 || spansInserted > 3) {
            newText = "";
            spansInserted = 0;
            for(var i = 0; i < text.length; i++) {
                newText += text[i];
                if((!$("#encode").attr("checked") || text[i] === ';') && this.randomNumber(10) == 1) {
                    spansInserted++;
                    newText += "<span style=\"display:none\">";
                    for(var r = 0; r < this.randomNumber(3)+3; r++) {
                        newText += String.fromCharCode(this.randomNumber(26)+96);
                    }
                    newText += "</span>";
                }
            }
        }

        // Don't add spans into the cleanEmail, or mailto will barf.
        emailObj.text = newText;
    },

    // Includes a mailto: link.
    mailto: function(emailObj) {
        emailObj.text = "<a href=\"mailto:" + emailObj.cleanEmail + "\">" + emailObj.text + "</a>";
    },

    // Wrap `text` in a javascript snippet that will print it out to the
    // document.
    javascript: function(emailObj) {
        var text = emailObj.text;
        var newText = "<script type=\"text/javascript\">document.write(\"";

        for(var i = 0; i < text.length; i++) {
            // Be sure to escape quotation marks
            if(text[i] !== "\"") {
                newText += text[i];
            }else {
                newText += "\\\"";
            }
            if(this.randomNumber(10) == 1) {
                newText += "\"+\"";
            }
        }

        newText += "\");</script>";

        emailObj.text = newText;
    }

};

function obfuscate() {
    var text = $("#toObfuscate").val();

    // If the user doesn't provide us with any text, we'll just
    // use our placeholder text.
    if(text === "") {
        text = $("#toObfuscate").attr("placeholder");
    }

    var emailObj = {text: text, cleanEmail: text};

    // Run through an perform all of the operations checked off.
    $("#options input:checked").each(function(index, el) {
        obfuscator[el.id](emailObj);
    });

    $("#obfuscatedText").text(emailObj.text);
}

function checkWarnings() {
    if($("#javascript").attr("checked")) {
        $("#info").slideUp();
        $("#mailtoWarning").slideUp();
        $("#javascriptWarning").slideDown();
    }else if($("#spans").attr("checked") && $("#mailto").attr("checked")) {
        $("#info").slideUp();
        $("#javascriptWarning").slideUp();
        $("#mailtoWarning").slideDown();
    }else {
        $("#mailtoWarning").slideUp();
        $("#javascriptWarning").slideUp();
    }
}

$(function() {
    // Bind to a few actions so that the obfuscation happens
    // in realtime
    $("#toObfuscate").bind("keyup", function() {
        obfuscate();
    });

    $("input").change(function() {
        checkWarnings();
        obfuscate();
    });

    // Obfuscate our dummy text first, so the user has an idea
    // what theirs will look like.
    obfuscate();
});