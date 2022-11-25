<template>
	<div id="app">
		<div>
			<b-navbar toggleable="lg" type="dark" variant="primary">
				<b-navbar-brand href="/">ToDo List</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item to="/form">Criar Lista</b-nav-item>
						<b-nav-item to="/list">Tarefas</b-nav-item>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</div>
		<router-view />
	</div>
</template>

<style></style>
