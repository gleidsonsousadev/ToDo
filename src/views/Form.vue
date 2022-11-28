<script>
import { required, minLength } from 'vuelidate/lib/validators';

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

	validations: {
		form: {
			subject: {
				required,
				minLength: minLength(3),
			},
		},
	},

	methods: {
		saveTask() {
			let index = this.$route.params.index;
			let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

			if (index !== undefined) {
				tasks[index] = this.form;
			} else {
				if ( this.form.subject.length < 1 ) {
					this.showToast( 'danger', 'Erro!', 'Digite uma Tarefa!' );	
					return
				} 
				const userId = JSON.parse( localStorage.getItem( "authUser" ) ).id
				tasks.push({...this.form, userId});
				index = tasks.length - 1;
			}
			localStorage.setItem('tasks', JSON.stringify(tasks));
			this.showToast('success', 'Parabéns!', 'Operação realizada com sucesso!');
			this.$router.push({ name: 'list', params: { index } });
		},
	},

	computed: {
		getValidation() {
			if (this.$v.form.subject.$dirty === false) {
				return null;
			}

			return !this.$v.form.subject.$error;
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
					v-model.trim="$v.form.subject.$model"
					type="text"
					placeholder="Digite a Tarefa"
					required
					autocomplete="off"
					:state="getValidation"
					aria-describedby="subject-feedback"
				>
				</b-form-input>
			</b-form-group>
			<b-form-group label="Descrição" label-for="description">
				<b-form-textarea
					id="description"
					v-model="form.description"
					type="text"
					placeholder="Digite a descrição"
					required
					autocomplete="off"
				>
				</b-form-textarea>
			</b-form-group>
			<b-button
				type="button"
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
