/**
 * Created by Jakub on 19. 10. 2016.
 */
(function ($) {
    var messagesCount = 0;
    $.fn.ChatForm = function (options) {
        console.log(options);
        var textarea = this.find("textarea");
        var inputText = this.find("#text");

        setInterval(function () {updateChat(textarea, options.id);}, 500);

        this.submit(function (event) {
            event.preventDefault();
            sendChat(inputText.val(), options.id, options.from, textarea);
            inputText.val("");
        });


    };
    var sendChat = function (text, id, from) {
        $.get({
            url: 'save_get.php',
            data: {
                id: id,
                text: text,
                from: from
            },
            dataType:"text/html"
        });
    };

    var updateChat = function (textarea, chatId) {
        time = 0;
        $.ajax({
            cache: false,
            type: "GET",
            url: 'chatstore.xml',
            dataType: "xml"
        }).done(function (xml) {
            xml = $(xml);
            var tmp = xml.find("chat[id=" + chatId + "]");
            console.log(messagesCount);
            if (messagesCount < tmp.attr("date")) {
                loadChat(textarea,chatId);
            }
        });
    };
    var loadChat = function (textarea, chatId) {
        textarea.val("");
        $.ajax({
            cache:false,
            type: "GET",
            url: 'chatstore.xml',
            dataType: "xml"
        }).done(function (xml) {
            xml = $(xml);
            var texts = xml.find("chat[id=" + chatId + "]");
            messagesCount = texts.attr("date");
            texts.find("text").each(function () {
                textarea.val(textarea.val() +  $(this).attr("from") + ": " + $(this).text() + "\n");
            })
        });
    }
}(jQuery));
