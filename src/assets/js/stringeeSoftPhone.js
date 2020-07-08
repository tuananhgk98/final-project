function StringeeHashMap() {
	var obj = [];
	obj.size = function () {
		return this.length;
	};
	obj.isEmpty = function () {
		return this.length === 0;
	};
	obj.containsKey = function (key) {
		key = key + '';

		for (var i = 0; i < this.length; i++) {
			if (this[i].key === key) {
				return i;
			}
		}
		return -1;
	};
	obj.get = function (key) {
		key = key + '';

		var index = this.containsKey(key);
		if (index > -1) {
			return this[index].value;
		}
	};
	obj.put = function (key, value) {
		key = key + '';

		if (this.containsKey(key) !== -1) {
			return this.get(key);
		}
		this.push({'key': key, 'value': value});
	};
	obj.allKeys = function () {
		var allKeys = [];
		for (var i = 0; i < this.length; i++) {
			allKeys.push(this[i].key);
		}
		return allKeys;
	};
	obj.allIntKeys = function () {
		var allKeys = [];
		for (var i = 0; i < this.length; i++) {
			allKeys.push(parseInt(this[i].key));
		}
		return allKeys;
	};
	obj.remove = function (key) {
		key = key + '';

		var index = this.containsKey(key);
		if (index > -1) {
			this.splice(index, 1);
		}
	};
	
	obj.clear = function () {
		var allKeys = this.allKeys();
		for (var i = 0; i < allKeys.length; i++) {
			var key = allKeys[i];
			this.remove(key);
		}
	};

	return obj;
}
var StringeeSoftPhone = StringeeSoftPhone || {
	//private
	_ready: false,
	_iframe: null,
	_access_token: null,

	_onMethods: new StringeeHashMap(),

	_stringeeServerAddr: null,

	connected: false,

	//public
	showMode: 'full', //full | min | none
	top: undefined,
	left: undefined,
	right: undefined,
	bottom: undefined,
	arrowDisplay: 'top', //top | bottom | none
	arrowLeft: 20,
	recentCalls: [],
	fromNumbers: [],
	askCallTypeWhenMakeCall: false, //true
	appendToElement: null,

	makeAndReceiveCallInNewPopupWindow: false,
	showIconSetting: true,
	showButtonClose: true,
	routingType: 1,
	lang: 'vi',
	autoPickUp: false,
	// baseUrl: 'http://127.0.0.1/stringee/StringeeWebPhone-X/dist/'
	// baseUrl: 'https://test3.stringee.com/stringeex/web_phone/lastest/'
	baseUrl: 'https://static.stringee.com/stringeex/web_phone/lastest/'
};



StringeeSoftPhone.on = function (eventName, method) {
	StringeeSoftPhone._onMethods.put(eventName, method);
};

StringeeSoftPhone._callOnEvent = function (eventName, param) {
	var eventMethod = StringeeSoftPhone._onMethods.get(eventName);
	if (eventMethod) {
		if (param) {
			eventMethod.call(this, param);
		} else {
			eventMethod.call(this);
		}
	} else {
		console.log('Please implement StringeeSoftPhone event: ' + eventName);
	}
};

StringeeSoftPhone.init = function (config) {
	if (document.readyState === "complete") {
		StringeeSoftPhone._initOnReady(config);
		return;
	}

	document.addEventListener("DOMContentLoaded", function () {
		StringeeSoftPhone._initOnReady(config);
	});
};

StringeeSoftPhone._initOnReady = function (config) {
	//copy toan bo thuoc tinh cua config qua
	for (var propertyName in config) {
		StringeeSoftPhone[propertyName] = config[propertyName];
	}

	window.onbeforeunload = function (e) {
		e = e || window.event;

		// For IE and Firefox prior to version 4
		if (e && StringeeSoftPhone._iframe.contentWindow.stringeePhone.currentCall) {
			e.returnValue = 'Sure?';
		}

		// For Safari
		if (StringeeSoftPhone._iframe.contentWindow.stringeePhone.currentCall) {
			return 'Sure?';
		}
	};

	//build css: https://www.minifier.org/ : style_page.css
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.{position: relative;left: 26vw;top:-86vh;padding:0;display:block;background:#fff;z-index:1000;border-radius:10px;width:294px;height:556px;box-shadow:0 10px 30px 0 rgba(0,0,0,.15);border:1px solid #E9EBED;box-sizing: content-box}.stringee_iframe_wrapper .iframe{background-color:transparent;vertical-align:text-bottom;position:relative;width:100%;height:100%;min-width:100%;min-height:100%;max-width:100%;max-height:100%;margin:0;overflow:hidden;display:block;border-width:0}.drop-down-rectangle1{position:absolute;width:15px;height:15px;background:#FFF;transform:rotate(45deg);top:-5px;right:35px;border:1px solid #E9EBED}';
	document.getElementsByTagName('head')[0].appendChild(style);

	getContentIframe = function (iframe_html) {
		//tao the div chua iframe
		var div = document.createElement("div");
		// div.innerHTML = '<span class="drop-down-rectangle1"></span>';
		div.setAttribute('class', 'stringee_iframe_wrapper');
		div.style.display = 'none';

		//iframe
		var iframe = document.createElement('iframe');
		iframe.setAttribute('class', 'iframe');

		div.appendChild(iframe);

		//append vao body
		if (!StringeeSoftPhone.appendToElement) {
			document.body.appendChild(div);
		} else {
			//append vao the div bat ky
			//position: absolute;
			div.style.position = "absolute";

			var toElement = document.getElementById(StringeeSoftPhone.appendToElement);
			if (toElement) {
				toElement.appendChild(div);
			} else {
				console.log('ERROR: element with ID: ' + StringeeSoftPhone.appendToElement + ' not found!');
				return;
			}
		}


		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(iframe_html);
		iframe.contentWindow.document.close();

		
		// append language vao iframe
		// var langAllowed = ['vi','en'];
		// var lang = config.lang && langAllowed.includes(config.lang) ? config.lang : 'vi';
		// StringeeSoftPhone.lang = lang;
		// var srcLang = StringeeSoftPhone.baseUrl + 'js/lang/lang.'+ lang + '.js';
		// var jsElm = document.createElement("script");
		// jsElm.type = "application/javascript";
		// jsElm.src = srcLang;
		// iframe.contentWindow.document.getElementsByTagName('head')[0].prepend(jsElm)

		StringeeSoftPhone._iframe = iframe;

		console.log('++++ 1 append xong')
	};

	var iframe_html = '<!DOCTYPE html><html><head>    <title>SOFTPHONE CLOUND</title>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">     <!-- load config : https://static.stringee.com/stringeex/web_phone/lastest/ ## 1578239359-->    <link href="https://static.stringee.com/stringeex/web_phone/lastest/css/all-style.css?version=v1.0.0.5e12057f9213a" rel="stylesheet" type="text/css" />    <style>        #btnToolCall.btn-red:disabled,        #btnToolCall.btn-red[disabled] {            background: linear-gradient(262.92deg, #94343a 6.49%, #94343a 108.73%);        }        #btn-incomming-decline:disabled,        #btn-incomming-decline[disabled] {            background: linear-gradient(262.92deg, #94343a 6.49%, #94343a 108.73%);        }        #btn-incomming-accept:disabled,        #btn-incomming-accept[disabled] {            background: linear-gradient(262.92deg, #336b25 6.49%, #336b25 108.73%);        }        #btnToolCall.btn-green:disabled,        #btnToolCall.btn-green[disabled] {            background: linear-gradient(262.92deg, #40882f 6.49%, #40882f 108.73%);        }        .top-bar-title {            font-size: 14px !important;        }        .min-no-calls {            color: #525252;            width: 176px;            text-align: center;            padding-top: 3px;        }    </style>        <script type="text/javascript" src="/assets/js/webPhoneAllJs.min.js"></script></head><body>    <div id="stringee_clound" class="overflow-hidden">        <div id="app-minimize" class="cursor-pointer">            <div class="wrap-info-minimize display-flex justify-content-space-between font-size-16">                <div class="time bg-pink border-radius-16 color-white display-none">00:28</div>                <div class="line-vertical display-none"></div>                <div class="phone line-height-26 display-none">0966050828</div>                <div class="min-no-calls" data-translate="no_calls">No calls</div>            </div>        </div>        <div id="app">            <!--  TOP TOAST --><section class="wrap-top-bar height-40 position-absolute top-0 width-100-percent">    <div id="toast-area" class="toast display-none">        toast message    </div></section><!--  END TOAST  -->            <!--  TOP BAR --><section class="wrap-top-bar height-40 position-absolute top-0 width-100-percent">    <div class="top-bar-status color-red" data-translate="not_connected">        ChÆ°a káº¿t ná»‘i    </div>    <div class="text-center top-bar-title">        CONTACT    </div>    <div class="wrap-action-top-right float-right mr position-absolute right-15 top-10">        <div class="wrapper-dropdown wrapper-dropdown-call">            <div id="dropdown-option-call" class="wrapper-dropdown-3" tabindex="1">                <span id="routingTypeLabelActived"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-browser.png" class="icon-option-active"                        title="Äá»• cuá»™c gá»i Ä‘áº¿n app vÃ  sipphone" /></span>                <ul class="dropdown">                    <li data-value="1"><a href="javascript:void(0)"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-browser.png"                                class="icon-option" title="Äá»• cuá»™c gá»i Ä‘áº¿n app vÃ  sipphone"/><span data-translate="route_to_app_and_sipphone">Äá»• cuá»™c gá»i Ä‘áº¿n app vÃ                             sipphone</span></a></li>                    <li data-value="2"><a href="javascript:void(0)"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.png" class="icon-option"                                title="Äá»• cuá»™c gá»i Ä‘áº¿n sá»‘ Ä‘iá»‡n thoáº¡i" /><span data-translate="route_to_phone_number">Äá»• cuá»™c gá»i Ä‘áº¿n sá»‘ Ä‘iá»‡n thoáº¡i</span></a></li>                    <li data-value="3"><a href="javascript:void(0)"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-app.png" class="icon-option"                                title="Äá»• cuá»™c gá»i Ä‘áº¿n app" /><span data-translate="route_to_app">Äá»•                            cuá»™c gá»i Ä‘áº¿n app</span></a></li>                    <li data-value="4"><a href="javascript:void(0)"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-ipphone.png"                                class="icon-option" title="Äá»• cuá»™c gá»i Ä‘áº¿n ipphone" /><span data-translate="route_to_ipphone">Äá»• cuá»™c gá»i Ä‘áº¿n ipphone</span></a></li>                </ul>            </div>                    </div>        <button id="btnMinimize" class="btn-minimize border-none bg-transparent" title="Minimize">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-minimize.svg">        </button>                <div class="wrapper-dropdown wrapper-dropdown-call auto" style="float:right">            <div id="dropdown-auto-receive-call" class="wrapper-dropdown-3" tabindex="3">                <span id="settingAgent">                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-setting-gray.svg" class="icon-option-active" title="personal settings" />                </span>                <ul class="dropdown setting-agent">                    <li data-value="1" class="auto-pick-call">                        <label>                            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-setting-gray.svg" class="icon-option" title="Auto Pick Call"/>                            <span data-translate="auto_pick_call">Auto Pick Call</span>                        </label>                         <input type="checkbox" id="autopickcheckbox"/>                    </li>                    <li data-value="2" class="item-transfer-ipphone">                        <label>                            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-setting-gray.svg" class="icon-option" title="Auto Pick Call"/>                            <span data-translate="transfer_ip_phone">Transfer to IPPhone</span>                        </label>                         <input type="checkbox" id="transfer-ip-phone"/>                    </li>                </ul>            </div>                    </div>    </div>    <!-- <input type="checkbox" id="autopickcheckbox" > --></section><!--  END TOP BAR  -->            <!-- PAGE CALLING  --><section id="page-calling" class="page display-none">    <section class="wrap-status p-l-r-20 top-0 position-relative display-flex">        <div class="wrap-status-text line-height-30">            <span class="status-text" data-translate="currently_in_call">Currently in call..</span>            <div class="line-red-short"></div>        </div>        <div class="wrap-status-time line-height-30 position-absolute right-0">            <span class="status-time"> </span>        </div>    </section>    <section class="wrap-info p-20">        <div class="info-name pb-10">            Pattrick Penna        </div>        <div class="wrap-location">            <span class="location-via" data-translate="via">thÃ´ng qua</span>            <span class="location-text" data-translate="location">Vietnam</span>        </div>    </section>    <div class="line-dotted"></div>    <section class="wrap-action display-flex justify-content-space-between">        <button id="btnMic" class="action-call text-center flex-basis p-10 bg-white border-none">            <img class="icon" src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-mic.svg" />            <img class="icon-on display-none" src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-mic-off.svg" />        </button>        <button id="btnHold" class="action-call text-center flex-basis p-10 bg-white border-none">            <img class="icon" src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-pause.svg" />            <img class="icon-on display-none" src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-pause-red.svg">        </button>        <button id="btnKeypadInCall" class="action-call text-center flex-basis p-10 bg-white border-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-pad-gray.svg" />        </button>        <button id="btnTransfer" class="action-call text-center flex-basis p-10 bg-white border-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-back.svg" />        </button>        <button id="btnAddToCall" class="action-call text-center flex-basis p-10 bg-white border-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-add-to-call.svg">        </button>        <!--        <button id="btnMore" class="action-call text-center flex-basis p-10 bg-white border-none position-relative">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-more.svg" />            <span class="drop-down-action display-none">                <span class="drop-down-rectangle"></span>                <ul>                    <li>                        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-assign-call.svg" class="icon" />                        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-assign-call-purple.svg" class="icon-hover display-none" />                        <span>Assign this call</span>                    </li>                    <li>                        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-add-tag.svg" class="icon" />                        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-add-tag-purple.svg" class="icon-hover display-none" />                        <span>Add a tag</span>                    </li>                    <li>                        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-comment.svg" class="icon" />                        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-comment-purple.svg" class="icon-hover display-none" />                        <span>Add a comment</span>                    </li>                </ul>            </span>        </button>-->    </section>    <section class="wrap-background bg-gradient-purple height-350 width-100-percent">        <div class="wrap-avatar-round text-center">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/avatar.png" class="mt-80" />            <div class="callstart-time" style="margin-top: 35px;">                <div class="location-queue"> </div>            </div>        </div>    </section>    <section class="wrap-diapad-when-calling display-none">        <div class="wrap-typing-number pl-15 pr-15 mt-10 mb-10 display-flex justify-content-space-between">            <input type="text" value="" placeholder="*101#" class="font-size-24 color-black border-none" />            <button class="btn-close border-none bg-transparent">                <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-close.svg" />            </button>        </div>        <div class="wrap-diapad mb-20 diapad-size-medium">            <div class="diapad-row">                <button class="diapad-key" id="diapad-key-dtmf-1">                    <span class="diapad-key-number">                        1                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-2">                    <span class="diapad-key-number">                        2                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-3">                    <span class="diapad-key-number">                        3                    </span>                </button>            </div>            <div class="diapad-row">                <button class="diapad-key" id="diapad-key-dtmf-4">                    <span class="diapad-key-number">                        4                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-5">                    <span class="diapad-key-number">                        5                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-6">                    <span class="diapad-key-number">                        6                    </span>                </button>            </div>            <div class="diapad-row">                <button class="diapad-key" id="diapad-key-dtmf-7">                    <span class="diapad-key-number">                        7                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-8">                    <span class="diapad-key-number">                        8                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-9">                    <span class="diapad-key-number">                        9                    </span>                </button>            </div>            <div class="diapad-row">                <button class="diapad-key" id="diapad-key-dtmf-star">                    <span class="diapad-key-number">                        *                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-0">                    <span class="diapad-key-number">                        0                    </span>                </button>                <button class="diapad-key" id="diapad-key-dtmf-sharp">                    <span class="diapad-key-number">                        #                    </span>                </button>            </div>        </div>    </section></section><!-- END PAGE CALLING  -->            <!--  PAGE INCOMMING CALL  --><section id="page-incomming-call" class="page display-none">    <div class="incomming-call-info box-shadow1 border-radius-18 bg-gradient-purple overflow-hidden mb-20">        <div class="wrap-info-text bg-white pt-20 pb-20">            <section class="wrap-status p-l-r-20 top-0 position-relative display-flex ">                <div class="wrap-status-text line-height-30">                    <span class="status-text" data-tranlate="currently_in_call">Currently in call..</span>                    <div class="line-red-short"></div>                </div>                <div class="wrap-agent-time line-height-30 position-absolute right-0">                    <span class="agent-time"> </span>                </div>            </section>            <section class="wrap-info p-20">                <div class="info-name pb-10">                    Pattrick Penna                </div>                <div class="wrap-location">                    <span class="location-via" data-translate="via">thÃ´ng qua</span>                    <span class="location-text" data-translate="location">Vietnam</span>                </div>            </section>        </div>        <section class="wrap-background bg-gradient-purple height-350 width-100-percent">            <div class="wrap-avatar-round text-center">                <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/avatar.png" class="mt-50" />            </div>            <div class="callstart-time">                <div class="location-queuetime"> </div>                <div class="location-queue"> </div>            </div>        </section>    </div>    <div class="incomming-call-action display-flex justify-content-space-between">        <button id="btn-incomming-decline" class="btn-action-incomming btn-round btn-red btn-size-55 display-table-cell border-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" style="transform: rotate(135deg)" />        </button>        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-dotted-end.svg" />        <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-dotted-call.svg" />        <button id="btn-incomming-accept" class="btn-action-incomming btn-round btn-green btn-size-55 display-table-cell border-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />        </button>    </div></section><!-- END PAGE INCOMMING CALL -->            <!-- PAGE DIAPAD --><section id="page-diapad" class="page">    <div class="wrap-typing-number pl-15 pr-15 mt-10 mb-30 display-flex justify-content-space-between">        <input type="text" value="" placeholder="+84966050926" class="font-size-24 color-black border-none" />        <button class="btn-close border-none bg-transparent">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-close.svg" />        </button>    </div>    <div class="wrap-diapad mb-10">        <div class="diapad-row">            <button class="diapad-key" id="diapad-key-1">                <span class="diapad-key-number">                    1                </span>                <span class="diapad-key-text">                </span>            </button>            <button class="diapad-key" id="diapad-key-2">                <span class="diapad-key-number">                    2                </span>                <span class="diapad-key-text">                    ABC                </span>            </button>            <button class="diapad-key" id="diapad-key-3">                <span class="diapad-key-number">                    3                </span>                <span class="diapad-key-text">                    DEF                </span>            </button>        </div>        <div class="diapad-row">            <button class="diapad-key" id="diapad-key-4">                <span class="diapad-key-number">                    4                </span>                <span class="diapad-key-text">                    GHI                </span>            </button>            <button class="diapad-key" id="diapad-key-5">                <span class="diapad-key-number">                    5                </span>                <span class="diapad-key-text">                    JKL                </span>            </button>            <button class="diapad-key" id="diapad-key-6">                <span class="diapad-key-number">                    6                </span>                <span class="diapad-key-text">                    MNO                </span>            </button>        </div>        <div class="diapad-row">            <button class="diapad-key" id="diapad-key-7">                <span class="diapad-key-number">                    7                </span>                <span class="diapad-key-text">                    PQRS                </span>            </button>            <button class="diapad-key" id="diapad-key-8">                <span class="diapad-key-number">                    8                </span>                <span class="diapad-key-text">                    TUV                </span>            </button>            <button class="diapad-key" id="diapad-key-9">                <span class="diapad-key-number">                    9                </span>                <span class="diapad-key-text">                    WXYZ                </span>            </button>        </div>        <div class="diapad-row">            <button class="diapad-key" id="diapad-key-star">                <span class="diapad-key-number">                    *                </span>                <span class="diapad-key-text">                </span>            </button>            <button class="diapad-key" id="diapad-key-0">                <span class="diapad-key-number">                    0                </span>                <span class="diapad-key-text" style="font-size: 18px;">                    <span>                        <!-- + -->                    </span>                </span>            </button>            <button class="diapad-key" id="diapad-key-sharp">                <span class="diapad-key-number">                    #                </span>                <span class="diapad-key-text">                </span>            </button>        </div>    </div>    <div class="wrap-call-using-dropdown position-relative display-none">        <div id="list-from-numbers" class="call-using-dropdown box-shadow3 border-radius-8 bg-white">            <!--			<div class="call-using-dropdown-item cursor-pointer p-15 pt-10 pb-10">				<div>					<span class="call-using-text-name display-block">Number 1</span>					<span class="call-using-text-phone display-block">+84899199586</span>				</div>			</div>-->        </div>        <div class="icon-dropdown right-40">        </div>    </div>    <div class="wrap-call-using pl-20 pr-20 position-relative cursor-pointer">        <div class="call-using-text mb-5" data-translate="using_number">            Sá»­ dá»¥ng sá»‘        </div>        <div class="call-using-select p-15 display-flex justify-content-space-between">            <div>                <span id="from-number-callout-alias" class="call-using-text-name display-block">Number 1</span>                <span id="from-number-callout" class="call-using-text-phone display-block">+84899199586</span>            </div>            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-dropdown.svg" />        </div>    </div></section><!-- END PAGE DIAPAD --->            <!-- PAGE CONTACT --><section id="page-contact" class="page display-none">    <div class="wrap-contact-filter p-l-r-20 mb-20 display-table">        <div class="contact-filter display-flex font-size-12">            <button class="contact-filter-item active p-5 p-l-r-10 mr-10 mt-5 border-none">Táº¥t cáº£</button>            <button class="contact-filter-item p-5 p-l-r-10 mt-5 border-none">NhÃ³m</button>        </div>        <div class="wrap-input-search">            <input type="text" id="inputSearchContact" class="input-search position-absolute font-size-18 pl-15 right-0 top-0 display-none border-none outline-none" />            <button id="btnSearchContact" class="bg-transparent border-none position-absolute btn-finter-search right-15 top-5 p-10 outline-none cursor-pointer"><img class="pointer-events-none" src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-search.svg" /></button>        </div>    </div>    <div class="line-dotted"></div>    <div class="wrap-contact-list">        <div class="wrap-contact-list-content">            <div class="wrap-contact-group display-flex pl-15 pt-20">                <div class="contact-group-name">                    A                </div>                <div class="contact-group-item width-100-percent">                    <div class="contact-item display-flex">                        <button class="wrap-contact-item-avatar bg-purple border-radius-12 width-35 height-35 text-center">                            <span class="contact-item-avatar"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" /></span>                            <span class="contact-item-status status-offline"></span>                        </button>                        <div class="wrap-contact-item-info">                            <div class="contact-item-name">                                Pattrick Penna                            </div>                            <div class="contact-item-phone">                                Stringee                            </div>                            <div class="contact-item-call visibility-hidden">                                <button class="btn-round btn-green btn-call-item display-table-cell border-none cursor-pointer">                                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />                                </button>                            </div>                        </div>                    </div>                    <div class="contact-item display-flex">                        <button class="wrap-contact-item-avatar bg-light-green border-radius-12 width-35 height-35 text-center">                            <span class="contact-item-avatar"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" /></span>                            <span class="contact-item-status status-online"></span>                        </button>                        <div class="wrap-contact-item-info">                            <div class="contact-item-name">                                Pattrick Penna                            </div>                            <div class="contact-item-phone">                                Stringee                            </div>                            <div class="contact-item-call visibility-hidden">                                <button class="btn-round btn-green btn-call-item display-table-cell border-none cursor-pointer">                                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />                                </button>                            </div>                        </div>                    </div>                    <div class="contact-item display-flex">                        <button class="wrap-contact-item-avatar bg-light-blue border-radius-12 width-35 height-35 text-center">                            <span class="contact-item-avatar"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" /></span>                            <span class="contact-item-status status-offline"></span>                        </button>                        <div class="wrap-contact-item-info">                            <div class="contact-item-name">                                Pattrick Penna                            </div>                            <div class="contact-item-phone">                                Stringee                            </div>                            <div class="contact-item-call visibility-hidden">                                <button class="btn-round btn-green btn-call-item display-table-cell border-none cursor-pointer">                                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />                                </button>                            </div>                        </div>                    </div>                </div>            </div>            <div class="wrap-contact-group display-flex pl-15 pt-20">                <div class="contact-group-name">                    B                </div>                <div class="contact-group-item width-100-percent">                    <div class="contact-item display-flex">                        <button class="wrap-contact-item-avatar bg-purple border-radius-12 width-35 height-35 text-center">                            <span class="contact-item-avatar"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" /></span>                            <span class="contact-item-status status-offline"></span>                        </button>                        <div class="wrap-contact-item-info">                            <div class="contact-item-name">                                Pattrick Penna                            </div>                            <div class="contact-item-phone">                                Stringee                            </div>                            <div class="contact-item-call visibility-hidden">                                <button class="btn-round btn-green btn-call-item display-table-cell border-none cursor-pointer">                                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />                                </button>                            </div>                        </div>                    </div>                    <div class="contact-item display-flex">                        <button class="wrap-contact-item-avatar bg-light-green border-radius-12 width-35 height-35 text-center">                            <span class="contact-item-avatar"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" /></span>                            <span class="contact-item-status status-online"></span>                        </button>                        <div class="wrap-contact-item-info">                            <div class="contact-item-name">                                Pattrick Penna                            </div>                            <div class="contact-item-phone">                                Stringee                            </div>                            <div class="contact-item-call visibility-hidden">                                <button class="btn-round btn-green btn-call-item display-table-cell border-none cursor-pointer">                                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />                                </button>                            </div>                        </div>                    </div>                    <div class="contact-item display-flex">                        <button class="wrap-contact-item-avatar bg-light-blue border-radius-12 width-35 height-35 text-center">                            <span class="contact-item-avatar"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" /></span>                            <span class="contact-item-status status-offline"></span>                        </button>                        <div class="wrap-contact-item-info">                            <div class="contact-item-name">                                Pattrick Penna                            </div>                            <div class="contact-item-phone">                                Stringee                            </div>                            <div class="contact-item-call visibility-hidden">                                <button class="btn-round btn-green btn-call-item display-table-cell border-none cursor-pointer">                                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />                                </button>                            </div>                        </div>                    </div>                </div>            </div>            <div class="wrap-contact-group display-flex pl-15 pt-20">                <div class="contact-group-name">                    C                </div>                <div class="contact-group-item width-100-percent">                    <div class="contact-item display-flex">                        <button class="wrap-contact-item-avatar bg-purple border-radius-12 width-35 height-35 text-center">                            <span class="contact-item-avatar"><img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" /></span>                            <span class="contact-item-status status-offline"></span>                        </button>                        <div class="wrap-contact-item-info">                            <div class="contact-item-name">                                Pattrick Penna                            </div>                            <div class="contact-item-phone">                                Stringee                            </div>                            <div class="contact-item-call visibility-hidden">                                <button class="btn-round btn-green btn-call-item display-table-cell border-none cursor-pointer">                                    <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />                                </button>                            </div>                        </div>                    </div>                </div>            </div>        </div>    </div></section><!-- END PAGE CONTACT -->            <!-- PAGE ACTIVITY --><section id="page-activity" class="page display-none">    <!-- <div class="wrap-contact-filter p-l-r-20 mb-20 display-table">        <div class="contact-filter display-flex font-size-12">            <button class="contact-filter-item active p-5 p-l-r-10 mt-5 mr-10 border-none">Inbox</button>            <button class="contact-filter-item p-5 p-l-r-10 mt-5 border-none">All</button>        </div>    </div> -->    <div class="line-dotted"></div>    <div class="wrap-activity-list">        <div  class="wrap-activity-list-content">            <div id="list-recent-calls">                        </div>         </div>    </div></section><!-- <div class="call-wrapper">            </div> -->                <!-- <div class="activity-date">20/06/2018</div>                <div  class="wrap-activity-group" >                    <div class="wrap-activity-item display-flex">                        <div class="activity-icon">                            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-call-out.svg" />                        </div>                        <div class="activity-info">                            <div class="activity-phone">+84 966050824</div>                            <div class="activity-via">Giangle via Stringee</div>                        </div>                        <div class="activity-time">                            6:40 PM                        </div>                        <div class="activity-more">                            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-arrow-point-to-right.svg" />                        </div>                     </div>                </div> --><!-- END PAGE ACTIVITY -->            <!-- TOOLBAR FOOTER --><section class="wrap-toolbar-bottom position-absolute bottom-0 height-100 width-100-percent box-shadow2 z-index-100 bg-white">    <div class="wrap-toolbar text-center display-flex justify-content-space-evenly">        <button id="btnToolActivity" class="toolbar-item display-table-cell border-none bg-transparent">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-list-gray.svg" class="icon-gray"/>            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-list.svg" class="icon"/>        </button>		        <button id="btnToolSetting" class="toolbar-item display-table-cell border-none bg-transparent display-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-setting-gray.svg" class="icon-gray" />            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-setting.svg" class="icon" />        </button>		        <button id="btnToolCall" class="btn-action-incomming btn-round btn-green btn-size-55 display-table-cell border-none mt-15-negative">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon-gray" />            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon" />        </button>		<!--		<button id="btnToolEndCall" class="btn-action-incomming btn-round btn-red btn-size-55 display-table-cell border-none mt-15-negative">            <img src="images/icon-phone.svg" class="icon-gray" />            <img src="images/icon-phone.svg" class="icon" />        </button>-->		        <button id="btnToolPad" class="btn-action-incomming btn-round btn-green btn-size-55 display-table-cell border-none mt-15-negative display-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-pad.svg" class="icon-gray" />            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-pad.svg" class="icon" />        </button>        <button id="btnToolContact" class="toolbar-item display-table-cell border-none bg-transparent">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user-gray.svg" class="icon-gray" />            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-user.svg" class="icon"/>        </button>        <button id="btnToolAdd" class="toolbar-item display-table-cell border-none bg-transparent display-none">            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-add-gray.svg" class="icon-gray" />            <img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-add.svg" class="icon" />        </button>    </div></section><!-- END TOOLBAR FOOTER -->            <!-- Select call type --><section class="wrap-option-call position-absolute z-index-100 display-none">	<button class="btn-close-option-call border-none bg-transparent float-right">		<img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-close.svg">	</button>	<div class="mt-150">		<button class="btn-otption-call btn-free-voice-call">			<span class="btn-icon">				<img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon-gray" width="15">			</span>			<span data-translate="free_voice_call">Free voice call</span>		</button>		<button class="btn-otption-call btn-free-video-call">			<span class="btn-icon">				<img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-videocall.svg" class="icon-gray" width="15">			</span>			<span data-translate="free_video_call">Free video cal</span>		</button>		<button class="btn-otption-call btn-free-callout">			<span class="btn-icon">				<img src="https://static.stringee.com/stringeex/web_phone/lastest/images/icon-phone.svg" class="icon-gray" width="15">			</span>			<span data-translate="call_out">Call out</span>		</button>	</div></section><!-- Select call type -->        </div>        <audio preload="auto" id="ringtonePlayer" playsinline style="width: 1px" src="https://static.stringee.com/stringeex/web_phone/lastest/audio/Antique-Phone5.mp3"></audio>        <video id="remoteVideo" playsinline autoplay style="width: 1px"></video>    </div></body></html>';
	getContentIframe(iframe_html);




};

StringeeSoftPhone.connect = function (access_token) {
	StringeeSoftPhone._access_token = access_token;
	if (StringeeSoftPhone._iframe && StringeeSoftPhone._iframe.contentWindow.stringeePhone) {
		StringeeSoftPhone._iframe.contentWindow.stringeePhone.connect(access_token);
	}
};

StringeeSoftPhone.showPopupAskCallType = function(show) {
	StringeeSoftPhone._iframe.contentWindow.stringeePhone.showPopupAskCallType(show);
};

StringeeSoftPhone.disconnect = function () {
	if (StringeeSoftPhone._iframe && StringeeSoftPhone._iframe.contentWindow.stringeePhone) {
		StringeeSoftPhone._iframe.contentWindow.stringeePhone.disconnect();
	} else {
		console.log('StringeePhone not ready');
	}
};

StringeeSoftPhone.config = function (config) { //{top, left, right, bottom}
	//copy toan bo thuoc tinh cua config qua
	for (var propertyName in config) {
		StringeeSoftPhone[propertyName] = config[propertyName];
	}

	if (!StringeeSoftPhone._ready) {
		return;
	}

	var iframe_wrappers = document.getElementsByClassName("stringee_iframe_wrapper");
	if (iframe_wrappers.length > 0) {
		var iframe_wrapper = iframe_wrappers[0];

		//vi tri cua iframe
		if (config.top !== undefined) {
			iframe_wrapper.style.top = config.top + 'px';
		}
		if (config.left !== undefined) {
			iframe_wrapper.style.left = config.left + 'px';
		}
		if (config.right !== undefined) {
			iframe_wrapper.style.right = config.right + 'px';
		}
		if (config.bottom !== undefined) {
			iframe_wrapper.style.bottom = config.bottom + 'px';
		}

		//vi tri cua arrow
		var arrows = document.getElementsByClassName("drop-down-rectangle1");
		if (arrows.length > 0) {
			var arrow = arrows[0];
			if (config.arrowDisplay !== undefined) {
				if (config.arrowDisplay === 'top') {
					arrow.style.top = '-5px';
					arrow.style.display = 'block';
				} else if (config.arrowDisplay === 'bottom') {
					arrow.style.top = '526px';
					arrow.style.display = 'block';
				} else if (config.arrowDisplay === 'none') {
					arrow.style.display = 'none';
				}
			}

			if (config.arrowLeft !== undefined) {
				arrow.style.left = config.arrowLeft + 'px';
			}
		}

		//show mode
		if (config.showMode === 'full' || config.showMode === 'min') {
			if (StringeeSoftPhone._ready) {
				iframe_wrapper.style.display = 'block';

				if (config.showMode === 'min') {
					iframe_wrapper.style.width = '206px';
					iframe_wrapper.style.height = '44px';
				} else {
					iframe_wrapper.style.width = '287px';
					iframe_wrapper.style.height = '538px';
				}

				StringeeSoftPhone._iframe.contentWindow.stringeePhone.showMode(config.showMode);

				StringeeSoftPhone._callOnEvent('displayModeChange', config.showMode);
			}
		} else if (config.showMode === 'none') {
			if (StringeeSoftPhone._ready) {
				iframe_wrapper.style.display = 'none';

				StringeeSoftPhone._callOnEvent('displayModeChange', config.showMode);
			}
		}

		//fromNumbers
		if (config.fromNumbers !== undefined) {
			StringeeSoftPhone._iframe.contentWindow.stringeePhone.setFromNumbers(config.fromNumbers);
		}

		//recentCalls
		// if (StringeeSoftPhone.recentCalls !== undefined) {
		// 	StringeeSoftPhone._iframe.contentWindow.stringeePhone.setRecentCalls(StringeeSoftPhone.recentCalls);
		// }

		//showButtonClose
		if (config.showButtonClose !== undefined) {
			if (config.showButtonClose) {
				StringeeSoftPhone._iframe.contentWindow.stringeePhone.showButtonClose('show');
			} else {
				StringeeSoftPhone._iframe.contentWindow.stringeePhone.showButtonClose('none');
			}
		}

		if (config.routingType !== undefined) {
			StringeeSoftPhone._iframe.contentWindow.stringeePhone.showIconRoutingType(config.routingType)
		}	

		if(config.ringToneFile !== undefined) {
			StringeeSoftPhone._iframe.contentWindow.stringeePhone.setRingTone(config.ringToneFile);
		}
	}
};





StringeeSoftPhone.show = function (showMode) {
	var config = {
		showMode: showMode
	};
	StringeeSoftPhone.config(config);


};

StringeeSoftPhone.setRecentCalls = function (recentCalls) {
	StringeeSoftPhone.recentCalls = recentCalls;
	if (!StringeeSoftPhone._ready) {
		return false;
	}
	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.setRecentCalls(recentCalls);

	// if (StringeeSoftPhone._iframe && StringeeSoftPhone._iframe.contentWindow.stringeePhone) {
	// 	StringeeSoftPhone._iframe.contentWindow.stringeePhone.setRecentCalls(recentCalls);
	// }
}

StringeeSoftPhone.makeCall = function (fromNumber, toNumber, callback, callType) {
	if (!StringeeSoftPhone._ready) {
		callback.call(this, {
			r: 1,
			msg: 'StringeeSoftphone is not ready yet'
		});
		return;
	}

	StringeeSoftPhone._iframe.contentWindow.stringeePhone.makeCallWithUI(fromNumber, toNumber, callback, callType);
};

StringeeSoftPhone.hangupCall = function () {
	if (!StringeeSoftPhone._ready) {
		return false;
	}

	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.hangupCall();
};

StringeeSoftPhone.hideCalling = function () {
	if (!StringeeSoftPhone._ready) {
		return false;
	}

	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.hideCalling();
};

StringeeSoftPhone.answerCall = function () {
	if (!StringeeSoftPhone._ready) {
		return false;
	}

	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.answerCall();
};

StringeeSoftPhone.setLabelHtml = function (selector, html) {
	if (!StringeeSoftPhone._ready) {
		return false;
	}

	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.setLabelHtml(selector, html);
};


StringeeSoftPhone.setAutoPickUp = function(val, type){
	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.setAutoPickUp(val, type)
}

StringeeSoftPhone.setTransferToIPPhone = function(val, type){
	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.setTransferToIPPhone(val, type)
}

StringeeSoftPhone.sendHold = function(musicOnHold){
	StringeeSoftPhone._iframe.contentWindow.stringeePhone.sendHold(musicOnHold)
}

StringeeSoftPhone.sendUnHold = function(){
	StringeeSoftPhone._iframe.contentWindow.stringeePhone.sendUnHold();
}

StringeeSoftPhone.setRingTone = function(source) {
	if(source) {
		StringeeSoftPhone._iframe.contentWindow.stringeePhone.setRingTone(source);
	}
}

// $(function StringeeSoftPhone(){
// 	alert('hello');
// })

function stringee(){
	return StringeeSoftPhone;
}
