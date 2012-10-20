var obfuscator = {
    encode: function(text) {
        var newText = "";
        for(var i = 0; i < text.length; i++) {
            newText += "&#" + text.charCodeAt(i) + ";";
        }
        return newText;
    },
    mailto: function(text) {
        return "<a href=\"mailto:" + text + "\"></a>";
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