<script>
export default {
	computed: {
		notIsLoginPage() {
			return this.$route.name !== 'login' && this.$route.name !== 'register';
		},
	},

	methods: {
		logout() {
			localStorage.removeItem('authUser');
			this.$router.push({ name: 'login' });
		},
	},
};
</script>

<template>
	<div id="app">
		<div>
			<b-navbar
				toggleable="lg"
				type="dark"
				variant="primary"
				v-if="notIsLoginPage"
			>
				<b-navbar-brand to="/">Task</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item to="/form">Criar Lista</b-nav-item>
						<b-nav-item to="/list">Tarefas</b-nav-item>
					</b-navbar-nav>
				</b-collapse>

				<b-navbar-nav right>
					<b-nav-item @click="logout()" v-b-tooltip.hover title="Sair">
						sair
					</b-nav-item>
				</b-navbar-nav>
			</b-navbar>
		</div>

		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.2s;
	transition-property: opacity;
	transition-timing-function: ease;
}

.fade-enter,
.fade-leave {
	opacity: 0;
}
</style>
