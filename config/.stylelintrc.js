module.exports = {
	"processors": [],
	"plugins": [
		"stylelint-a11y",
		"stylelint-declaration-block-no-ignored-properties",
		"stylelint-high-performance-animation",
		"stylelint-no-unsupported-browser-features",
		"stylelint-order"
	],
	"rules": {
		"order/order": ["custom-properties", "declarations"],
		"plugin/no-low-performance-animation-properties": true,
		"plugin/no-unsupported-browser-features": [
			true,
			{
				"ignore": ["rem"],
				"severity": "warn"
			}
		]
	},
	"extends": ["stylelint-config-recommended"]
};
