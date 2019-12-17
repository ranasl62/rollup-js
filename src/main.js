import $ from 'jquery';
import html from 'src/html/index.html';

$('body').append(html);

function div_bottom() {
    var elem = document.getElementById('auto_scroll');
    elem.scrollTop = elem.scrollHeight;
    document.getElementById("input_message").focus();
}

function button_info(button_message) {
    // return if the user does not enter any text
    if (!button_message) {
        return
    }

    // remove the loading indicator
    $("#loading").remove();

    $('.chat-container').append(`
        <div class="text_human">
                <span> ${button_message}</span>
        </div>
    `)

    // loading
    $('.chat-container').append(`
        <div class="text_bot" id="loading">
                <span><b>...</b></span>
        </div>
    `)
    // clear the text input
    $('#input_message').val('')

    // send the message
    submit_message(button_message)
    div_bottom()
}

function submit_message(message) {
    $.post("https://9a2d3534.ngrok.io/send_message", {message: message}, handle_response);

    function handle_response(data) {
        // remove the loading indicator
        $("#loading").remove();

        // default reply if there is no response data
        if (!data.message) {
            return $('.chat-container').append(`
                <div class="text_bot">
                    <span>Could not understand.</span></br>
                </div>
            `)
        }

        if (data.message == 'Human active') {
            return $("#loading").remove();
        }

        // reply from webhook call
        $('.chat-container').append(`
            <div class="text_bot">
                <span>${data.message}</span></br>
            </div>
        `)
        div_bottom()

        // loading
        $('.chat-container').append(`
            <div class="text_bot" id="loading">
                    <span><b>...</b></span>
            </div>
        `)
        div_bottom()
        $.post("https://9a2d3534.ngrok.io/button_reply", {btn_query: data.message}, button_response);

        function button_response(reply) {
            // remove the loading indicator
            $("#loading").remove();

            $.each(reply, function (index, element) {
                $('.chat-container').append(`
                     <div id="button_reply" class="btn btn-outline-success text_bot_button btn-sm m-1">${element.button_text}</div>
                `)
            });
            div_bottom()
        }
    }
}

$('#target').on('submit', function (e) {
    e.preventDefault();

    const input_message = $('#input_message').val()
    // return if the user does not enter any text
    if (!input_message) {
        return
    }

    $('.chat-container').append(`
        <div class="text_human">
                <span> ${input_message}</span>
        </div>
    `)
    // remove the loading indicator first
    $("#loading").remove();
    // loading
    $('.chat-container').append(`
        <div class="text_bot" id="loading">
                <span><b>...</b></span>
        </div>
    `)

    // clear the text input
    $('#input_message').val('')

    // send the message
    submit_message(input_message)
    div_bottom()
});

$('.chat-container').on('click', '#button_reply', function (e) {
    e.preventDefault();
    var button_message = $(this).text();
    button_info(button_message)
});

$('.chat-container').on('click', '#change_lang_btn', function (e) {
    e.preventDefault();
    var button_message = $(this).text();
    button_info(button_message)
});

$('.chat-container').on('click', '#banking_query_btn', function (e) {
    e.preventDefault();
    var button_message = $(this).text();
    button_info(button_message)
});

$('.chat-container').on('click', '#topup_button', function (e) {
    e.preventDefault();
    var button_message = $(this).text();
    button_info(button_message)
});

$(document).ready(function () {
    $(".chat-closed").on("click", function (e) {
        x = document.getElementById("chat-frame");
        if (x.style.display === 'none') {
            x.style.display = 'block';
            var i = document.getElementsByTagName("iframe")[0].contentWindow;
            i.document.getElementsByTagName("input")[0].focus();
            var elem = i.document.getElementById('auto_scroll');
            elem.scrollTop = elem.scrollHeight;
            var b = document.getElementById('chat-button');
            b.style.backgroundImage = "./img/message_close.jpg";
        } else {
            x.style.display = 'none';
            var b = document.getElementById('chat-button');
            b.style.backgroundImage = "./img/message_logo.jpg";
        }
    });
});
