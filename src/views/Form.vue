<script>
import ToastMixin from '@/mixins/toastMixin.js';

export default {
	name: 'Form',

	mixins: [ToastMixin],

	data() {
		return {
			form: {
				subject: '',
				description: '',
			},
			tasks: [],
		};
	},

	created() {
		const index = this.$route.params.index;
		this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

		if (index !== undefined) {
			this.form = this.tasks[index];
		}
	},

	methods: {
		saveTask() {
			let index = this.$route.params.index;
			let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

			if (index !== undefined) {
				tasks[index] = this.form;
			} else {
				tasks.push(this.form);
				index = tasks.length - 1;
			}
			localStorage.setItem('tasks', JSON.stringify(tasks));
			this.showToast('success', 'Parabéns!', 'Operação realizada com sucesso!');
			this.$router.push({ name: 'list', params: { index } });
		},
	},
};
</script>

<template>
	<div class="container mt2">
		<b-form class="m-3">
			<h3>Crie sua Lista de Tarefas!</h3>
			<b-form-group label="Tarefa" label-for="subject">
				<b-form-input
					id="subject"
					v-model="form.subject"
					type="text"
					placeholder="Digite a Tarefa"
					required
					autocomplete="off"
					value=""
				>
				</b-form-input>
			</b-form-group>
			<b-form-group label="Descrição" label-for="description">
				<b-form-textarea
					id="description"
					v-model="form.description"
					type="text"
					placeholder="Descrição da tarefa aqui!"
					required
					autocomplete="off"
					value=""
				>
				</b-form-textarea>
			</b-form-group>
			<b-button
				type="submit"
				variant="outline-primary"
				@click="saveTask"
				class="mr-3"
			>
				<b-icon icon="pin-angle-fill" />
				Salvar
			</b-button>
			<b-button to="/list" type="button" variant="success">
				Ir para Tarefas
			</b-button>
		</b-form>
	</div>
</template>
