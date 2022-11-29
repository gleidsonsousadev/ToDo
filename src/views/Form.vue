<script>
import { required, minLength } from 'vuelidate/lib/validators';

import ToastMixin from '@/mixins/toastMixin.js';

import { v4 as uuidv4 } from 'uuid';

export default {
	name: 'Form',
	
	mixins: [ToastMixin],
	
	data() {
		return {
			form: {
				id: '',
				subject: '',
				description: '',
				done: false
			},
			tasks: [],
		};
	},
	
	created() {
		const id = this.$route.params.id;
		this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
		
		if (id !== undefined) {
			this.form = this.tasks.filter(task => task.id == id)[0];
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
			let id = this.$route.params.id;
			let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
			
			if ( id !== undefined ) {
				const index = tasks.findIndex( item => item.id === id )
				tasks[index] = this.form;
			} else {
				if ( this.form.subject.length < 1 ) {
					this.showToast( 'danger', 'Erro!', 'Digite uma Tarefa!' );	
					return
				} 
				const userId = JSON.parse( localStorage.getItem( "authUser" ) ).id
				id = uuidv4();
				tasks.push({...this.form, userId, id});
			}
			localStorage.setItem('tasks', JSON.stringify(tasks));
			this.showToast('success', 'Parabéns!', 'Operação realizada com sucesso!');
			this.$router.push({ name: 'list', params: { id } });
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
