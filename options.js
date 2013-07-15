function save_options() {
	var toStore = storage.checked;

	chrome.storage.sync.set({"store": toStore}, function() {
		console.log("Storage Setting Saved: " + toStore);
	});

	if(toStore) {
		chrome.storage.local.set({"persistent": persistent.checked}, function() {
			console.log("Persistent Setting Saved Locally: " + persistent.checked);
		});
	} else {
		chrome.storage.sync.set({"persistent": persistent.checked}, function() {
			console.log("Persistent Setting Saved Via Sync: " + persistent.checked);
		});
	}
	
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
		status.innerHTML = "";
    }, 3000);
}

function restore_store() {
	chrome.storage.sync.get("store", function(val) {
		storage.checked = val["store"];
		console.log("Storage Setting Retrieved: " + val["store"]);
		restore_persistent();
	});	
}

function restore_persistent() {
	if(storage.checked) {
		chrome.storage.local.get("persistent", function(val) {
			persistent.checked = val["persistent"];
			console.log("Persistent Setting Retrieved From Local Storage: " + val["persistent"]);
		});
	} else {
		chrome.storage.sync.get("persistent", function(val) {
			persistent.checked = val["persistent"];
			console.log("Persistent Setting Retrieved From Sync: " + val["persistent"]);
		});
	}
}	

var img = document.getElementById("wiki");
img.addEventListener("click", function() {
	chrome.tabs.create({url: "http://warframe.wikia.com/wiki/"});
	window.close();
});

var persistent = document.getElementById("persistent");
var storage = document.getElementById("store");

var save = document.getElementById("save");
save.addEventListener("click", save_options, true);

document.addEventListener('DOMContentLoaded', restore_store);