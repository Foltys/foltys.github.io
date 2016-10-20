/**
 * Created by Jakub on 19. 10. 2016.
 */
(function ($) {
    var messagesCount = 0;
    $.fn.ChatForm = function (options) {
        console.log(options);
        var textarea = this.find("textarea");
        var inputText = this.find("#text");

        setInterval(function () {updateChat(textarea, options.id);}, 20);

        this.submit(function (event) {
            event.preventDefault();
            sendChat(inputText.val(), options.id, options.from, textarea);
            inputText.val("");
        });


    };
    var sendChat = function (text, id, from) {
        $.post({
            url: 'save.php',
            data: {
                id: id,
                text: text,
                from: from
            }
        });
    };

    var updateChat = function (textarea, chatId) {
        time = 0;
        $.ajax({
            type: "GET",
            url: 'chatstore.xml',
            dataType: "xml"
        }).done(function (xml) {
            xml = $(xml);
            var tmp = xml.find("chat[id=" + chatId + "]");
            if (messagesCount < tmp.attr("date")) {
                loadChat(textarea,chatId);
            }
        });
    };
    var loadChat = function (textarea, chatId) {
        textarea.val("");
        $.ajax({
            type: "GET",
            url: 'chatstore.xml',
            dataType: "xml"
        }).done(function (xml) {
            xml = $(xml);
            var texts = xml.find("chat[id=" + chatId + "]");
            messagesCount = texts.attr("date");
            texts.find("text").each(function () {
                textarea.val(textarea.val() + $(this).attr("date") + " " + $(this).attr("from") + ": " + $(this).text() + "\n");
            })
        });
    }
}(jQuery));
