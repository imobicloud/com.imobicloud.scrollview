var caches = {};

init($.args);
function init(args) {
	var container = $.container;
	
  	var exclude = ['id', 'children'];
    container.applyProperties( _.omit(args, exclude) );
    
    if (args.children) {
    	var actions = {
    		body: bodyLoad,
    		footer: footerLoad,
    		header: headerLoad
    	};
		_.each(args.children, function(child) {
			var role = child.role;
			if (role) {
				$[role] = child;
				var action = actions[role];
				action && action(child);
			}
			container.add(child);
		});
		args.children = null;
	}
}

function bodyLoad(child) {
  	if (child.apiName == 'Ti.UI.ScrollView') {
		child.addEventListener('scroll', bodyScroll);
	}
}

function footerLoad(child) {
  	caches.footer = child.height;
}

var footerVisible = true;
function footerAnimate(visible) {
  	if ($.footer == null || (OS_IOS && visible == footerVisible)) { return; }
  	$.footer.animate({ bottom: visible ? 0 : -caches.footer, duration: 300 });
  	footerVisible = visible;
}

function headerLoad(child) {
  	caches.header = child.height;
}

var headerVisible = true;
function headerAnimate(visible) {
  	if ($.header == null || (OS_IOS && visible == headerVisible)) { return; }
	$.header.animate({ top: visible ? 0 : -caches.header, duration: 300 });
	headerVisible = visible;
}

var lastY = 0, maxHeight; 
function bodyScroll(e) {
	var y = e.y;
	if (OS_ANDROID && y == lastY) { return; }
	if (OS_IOS && maxHeight == null) {
		maxHeight = e.contentSize.height - Ti.Platform.displayCaps.platformHeight;
	}
	if (OS_ANDROID || (y > 0 && y < maxHeight)) {
		headerAnimate(lastY > y);
		footerAnimate(lastY > y);
	}
  	lastY = y;
}




