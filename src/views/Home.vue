<script>
export default {
	name: 'Home',
	data() {
		return {};
	},
};
</script>

<template>
	<div>
		<b-card
			bg-variant="light"
			text-variant="dark"
			title="Crie sua Lista de Tarefas"
			class="text-center"
		>
			<b-card-text>
				Clique no botão abaixo e comece a organizar o seu dia!
			</b-card-text>
			<b-button to="/form" variant="primary">Criar Tarefa</b-button>
		</b-card>
	</div>
</template>
