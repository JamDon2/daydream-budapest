import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';

export const load = async () => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: '/relay-kHiw',
			ui_host: 'https://eu.posthog.com',
			capture_pageview: false,
			capture_pageleave: false,
			capture_exceptions: true // This enables capturing exceptions using Error Tracking, set to false if you don't want this
		});
	}
	return;
};
