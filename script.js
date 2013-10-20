function GetWiki() {
	var search = textBox.value;
	search = search.replace(/\b./g, function(m){ return m.toUpperCase(); });
	search = search.replace(" ", "_");
	
	var query_unchecked = "http://warframe.wikia.com/wiki/index.php?search=" + encodeURI(search) + "&fulltext=Search"
	var query_checked = "http://warframe.wikia.com/wiki/" + search
	
	chrome.tabs.create({url: ((check.checked) ? (query_checked) : (query_unchecked))});
	window.close();
}

function restore_store() {
	chrome.storage.sync.get("store", function(val) {
		console.log("Storage Setting Retrieved: " + val["store"]);
		restore_name(val["persistent"]);
	});	
}

function restore_name(val) {
	if(val) {
		chrome.storage.local.get("persistent", function(val) {
			checkbox.checked = val["persistent"];
			console.log("Persistent Setting Retrieved From Local Storage: " + val["persistent"]);
		});
	} else {
		chrome.storage.sync.get("persistent", function(val) {
			checkbox.checked = val["persistent"];
			console.log("Persistent Setting Retrieved From Sync: " + val["persistent"]);
		});
	}
}	

var submit = document.getElementById("submit");
submit.addEventListener("click", function() { GetWiki(); trackEvent(textBox.value, 'mouse'); }, true);

var checkbox = document.getElementById("check");

var img = document.getElementById("wiki");
img.addEventListener("click", function() {
	chrome.tabs.create({url: "http://warframe.wikia.com/wiki/"});
	window.close();
});

var textBox = document.getElementById("textbox");
textBox.addEventListener("keydown", function(event) {
	if(event.keyCode == 13) {
		GetWiki();
		trackEvent(textBox.value, 'keyboard');
	}
});

document.addEventListener('DOMContentLoaded', restore_store);

var _AnalyticsCode = 'UA-44984742-1';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
}());

function trackEvent(search, method) {
	console.log('Tracking search event: ' + search + ', From the ' + method);
	_gaq.push(['_trackEvent', search, method]);
}