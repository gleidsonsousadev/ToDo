<script>
export default {
	name: 'List',
	data() {
		return {
			search: '',
			tasks: [],
			taskSelected: [],
			taskHighlight: null,
		};
	},
	computed: {
		tasksList() {
			if (this.search.trim().length > 0) {
				const search = this.search.trim().toLowerCase();
				return this.tasks.filter(
					(task) =>
						task.subject.toLowerCase().includes(search) ||
						task.description.toLowerCase().includes(search)
				);
			}
			return this.tasks;
		},
	
	},

	created() {
		this.taskHighlight = this.$route.params.id;

		const userId = JSON.parse(localStorage.getItem("authUser")).id

		this.tasks = localStorage.getItem('tasks')
			? this.getLocalTasks().filter( ( item ) => {
				return item.userId === userId
			})
			: [];
	},
	methods: {

		setLocalTasks(tasks) {
			localStorage.setItem('tasks', JSON.stringify(tasks))
		},

		getLocalTasks() {
			return JSON.parse( localStorage.getItem( 'tasks' ) )
		},

		done( id ) {
			const index = this.tasks.findIndex( i => i.id === id );
			this.tasks[ index ].done = !this.tasks[ index ].done;
			const localTasks = this.getLocalTasks()
			const localIndex = localTasks.findIndex( i => i.id === id )
			localTasks[localIndex].done = !localTasks[localIndex].done 
			this.setLocalTasks(localTasks)
		},

		edit(id) {
			this.$router.push({ name: 'form', params: { id } });
		},

		remove(id) {
			this.taskSelected = id;
			this.$refs.modalRemove.show();
		},

		hideModal() {
			this.$refs.modalRemove.hide();
		},

		confirmRemoveTask() {
			this.tasks = this.tasks.filter( task => task.id !== this.taskSelected )
			const localTasks = this.getLocalTasks() 
			const tasks = localTasks.filter( task => task.id !== this.taskSelected )
			this.setLocalTasks(tasks)
			this.hideModal();
		},
	},
};
</script>

<template>
	<div class="container mt-4">
		<div class="m-2 mr-sm-2">
			<h2 class="m-2">Lista de Tarefas:</h2>
			<b-input-group size="sm" class="mb-2">
				<b-input-group-prepend is-text>
					<b-icon icon="search"></b-icon>
				</b-input-group-prepend>
				<b-form-input
					type="search"
					placeholder="Buscar Tarefa"
					v-model="search"
				></b-form-input>
			</b-input-group>
		</div>

		<div>
			<b-card
				:class="{ highlight: taskHighlight == task.id }"
				class="m-4"
				v-for="(task) in tasksList"
				:key="task.id"
			>
				<input type="checkbox" class="cbox4" :checked="task.done" :model="task.done" @click="done(task.id)" />
				<label for="cbox4">
					<b-card-text class="h3 mb-3" id="title">
						{{ task.subject }}
					</b-card-text>
				</label>
				<b-card-text class="h5 mb-3" id="title">
					{{ task.description }}
				</b-card-text>

				<b-button variant="outline-secondary" class="mr-2" @click="edit(task.id)">
					<b-icon icon="pencil-fill"></b-icon>
				</b-button>

				<b-button
					variant="outline-danger"
					class="mr-2"
					@click="remove(task.id)"
				>
					<b-icon icon="trash-fill"></b-icon>
				</b-button>
			</b-card>
			<b-button to="/form" class="m-2" variant="outline-primary">
				Voltar
			</b-button>
		</div>

		<b-modal ref="modalRemove" hide-footer title="Exclusão de Tarefa">
			<div class="d-block text-center">
				Deseja realmente excluir a tarefa {{ taskSelected.subject }} ?
			</div>
			<div class="mt-3 d-flex justify-content-end">
				<b-button variant="outline-secondary" class="mr-2" @click="hideModal">
					Cancelar
				</b-button>
				<b-button
					variant="outline-danger"
					class="mr-2"
					@click="confirmRemoveTask"
				>
					Excluir
				</b-button>
			</div>
		</b-modal>
	</div>
</template>

<style scoped>
input[type='checkbox'] {
	transform: scale(1.5);
}

input[type='checkbox']:checked + label {
	color: rgb(145, 145, 145);
	text-decoration: line-through;
	font-style: italic;
}
.cbox4 {
	margin-right: 10px;
}
.highlight {
	border: 1.5px solid rgb(158, 177, 169);
	background-color: rgb(245, 255, 251);
}
</style>
