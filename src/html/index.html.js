var html = `
<style>
body {
    font-family: Helvetica, Arial, sans-serif;
}
#chat-frame {
    border-radius: 8px;
    border: 1px solid rgba(34, 34, 34, 0.14);
    overflow: hidden;
    right: 40px;
    bottom: 100px;
    width: 350px;
    position: fixed;
    height: 530px;
    padding: 10px;
    box-shadow: -1px 2px 10px rgba(149, 149, 149, 0.3);
}

.chat-container {
    position: relative;
    top: 5px;
    bottom: 80px;
    width: 100%;
    padding: 0px;
}

.chat-message {
    padding: 6px;
    border-radius: 3px;
    margin-bottom: 3px;
}

.bot-message {
    background: #e9ebee;
    color: black;
    float: left;
    margin: 13px 1px;
}

.human-message {
    background: #0084ff;
    color: white;
    float: right;
}

.text_input {
    width: 326px;
    height: 40px;
    border: 1px solid #ddd;
    bottom: 12px;
    padding: 14px;
    position: absolute;
    font-size: .9rem;
    border-radius: 6px;
}
.b-agent-demo_powered_by {
    position: fixed;
    left: 0;
    right: 12px;
    bottom: 12px;
    height: 30px;
    vertical-align: middle;
}
.b-agent-demo_powered_by img {
    margin-top: 5px;
    height: 20px;
    margin-right: 10px;
    float: right;
    vertical-align: middle;
    border: 0;
}
.b-agent-demo_powered_by span {
    color: #b7bbc4;
    text-transform: uppercase;
    float: right;
    vertical-align: middle;
    line-height: 20px;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 10px;
    margin-left: -10px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #6f6f6f;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
.text_bot {
    text-align:left;
    padding: 2px 0px;
    max-width: 100%;
}
.top_corpo_logo {
    padding-left: 0;
    padding-top: 0;
}
.text_bot_button {
    text-align:left;
    max-width: 85%;
}
.text_bot span {
    background-color: #e9ebee;
    color: #444950;
    margin: 1px 0;
    padding: 2px 10px 6px 10px;
    border-radius: 12px;
    display: inline-block;
    clear: both;
    padding: .20rem .5rem;
    font-size: .9rem;
    line-height: 1.3;
    border-radius: 1rem;
    font-family: Helvetica, Arial, sans-serif;
}
.text_human {
    text-align:right;
    padding:0 5px;
}
.text_human span {
    background-color: #28a745;
    color: #fff;
    margin: 1px 0;
    display: inline-block;
    clear: both;
    padding: .20rem .5rem;
    font-size: .9rem;
    line-height: 1.3;
    border-radius: 1rem;
    font-family: Helvetica, Arial, sans-serif;
}
textarea:focus, input:focus {
    outline: none;
}
.btn-sm {
    line-height: 1.2;
    border-radius: 1rem;
    font-size: .9rem;
}
.btn-sm:hover {
    background-color: #fff;
    color: #28a745;
}
</style>
 <div id="chat-frame">
        <div id="full_body">
            <nav class="navbar navbar-expand-sm border-bottom bg-white navbar-dark top_corpo_logo" style="">
                <!-- Brand/logo -->
                <div>
                    <a class="navbar-brand" href="#">
                    <img src="./../img/customer_logo.jpg" alt="" style="width:90px;">
                    </a>
                </div>
                <div style="margin-top: 9px;">
                    <span style="color: rgba(0,0,0,.5); font-weight: bold; padding-right: 10px;"></span>
                </div>
            </nav>
            
            <div class="chat-container" id="auto_scroll" style="overflow-y: auto;">
                <!-- chat messages -->
            
                <div class="text_bot">
                    <!-- {% if reply %}
                    <span>{{reply}}</span>
                    {% else %} -->
                    <span>Hi... I'm your virtual assistant. How can I help you?</span>
                    <!-- {% endif%} -->
            
                    <span> Select quick link below </span></br>
                    <div id="banking_query_btn" class="btn btn-outline-success btn-sm m-1">Banking Query</div>
                    <div id="topup_button" class="btn btn-outline-success btn-sm m-1">Top Up</div>
                    <div id="change_lang_btn" class="btn btn-outline-success btn-sm m-1">Change Language</div>
                </div>
            </div>
            <div style="">
                <form id="target">
                    <input class="text_input" autofocus="autofocus" autocomplete="off" onclick="div_bottom()" onkeypress="div_bottom()"
                           type="text" value="" placeholder="Enter message..." id="input_message"/>
                    <input type="submit" hidden onclick="div_bottom()">
                </form>
            </div>
            <div class="b-agent-demo_powered_by">
                <a href="https://sslwireless.com" target="_blank">
            
                    <img src="./../img/vendor_logo.jpg" alt="">
            
                    <span>Powered by</span>
            
                </a>
            </div>
            </div>
        </div>
 <button class="btn btn-sm btn-light rounded-circle m-l-5 chat-closed" id="chat-button" style="position: absolute; right:20px; bottom: 36px; background: url(./../img/message_logo.jpg) round; width: 60px; height: 60px;"></button>
`;

module.exports.html = html;
