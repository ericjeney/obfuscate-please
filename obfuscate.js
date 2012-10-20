var obfuscator = {
    randomNumber: function(max) {
        return Math.floor((Math.random() * max) + 1);
    },

    encode: function(text) {
        var newText = "";
        for(var i = 0; i < text.length; i++) {
            newText += "&#" + text.charCodeAt(i) + ";";
        }
        return newText;
    },

    spans: function(text) {
        var newText;
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

        return newText;
    },

    mailto: function(text) {
        return "<a href=\"mailto:" + text + "\">" + text + "</a>";
    }

};

function obfuscate() {
    var text = $("#toObfuscate").val();
    if(text === "") {
        text = $("#toObfuscate").attr("placeholder");
    }
    $("#options input:checked").each(function(index, el) {
        text = obfuscator[el.id](text);
    });

    $("#obfuscatedText").text(text);
}

$(function() {
    $("#toObfuscate").bind("keyup", function() {
        obfuscate();
    });

    $("input").change(function() {
        obfuscate();
    });

    obfuscate();
});