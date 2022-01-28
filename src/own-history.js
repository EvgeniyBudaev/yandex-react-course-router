class OwnHistory {
	_listeners = [];

	pushState(state, url) {
		// eslint-disable-next-line no-restricted-globals
		history.pushState(state, '', url);
		this._notify();
	}

	replaceState(state, url) {
		// eslint-disable-next-line no-restricted-globals
		history.replaceState(state, '', url);
		this._notify();
	}

	_notify() {
		this._listeners.forEach(f => f());
	}

	listen(fn) {
		this._listeners.push(fn);
		return () => {
			this._listeners = this._listeners.filter(f => f !== fn);
		};
	}
}

export const ownHistory = new OwnHistory();
