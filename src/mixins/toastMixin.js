export default {
	methods: {
		showToast(variant, title, description) {
			this.$root.$bvToast.toast(description, {
				title,
				autoHideDelay: 3000,
				variant,
				solid: true,
			});
		},
	},
};
