<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import UsersModel from "@/models/UsersModel";
import ToastMixin from "@/mixins/toastMixin.js";

export default {

	mixins: [ToastMixin],

	data() {
		return {
			form: {
				email: '',
				password: '',
			},
		};
	},

	validations: {
		form: {
			email: {
				required,
				email,
			},

			password: {
				required,
				minLength: minLength(6),
			},
		},
	},

	methods: {
		async login() {
			this.$v.$touch();
			if (this.$v.$error) return;

			let user = await UsersModel.params({ email: this.form.email }).get();

			if (!user || !user[0] || !user[0].email) {
				this.showToast('danger', 'Erro!', 'Usuário e/ou senha incorretos!');
				this.clearForm();
				return;
			}

			user = user[0];
			if (user.password !== this.form.password) {
				this.showToast('danger', 'Erro!', 'Usuário e/ou senha incorretos');
				this.clearForm();
				return;
			}

			localStorage.setItem('authUser', JSON.stringify(user));
			this.$router.push({ name: 'list' });
		},

		clearForm() {
			this.form = {
				email: '',
				password: '',
			};
		},
		
		getValidation(field) {
			if (this.$v.form.$dirty === false) {
				return null;
			}
			
			return !this.$v.form[field].$error;
		},

		goToRegister() {
			this.$router.push({ name: 'register' });
		},
	},
};
</script>

<template>
	<b-row class="vh-100 vw-100 m-0">
		<b-col md="3" sm="1"></b-col>
		<b-col
			md="6" sm="10"
			class="d-flex justify-content-center align-items-center left-login"
		>
			<div class="col-8">
				<h2 class="text-center mb-5 title-login">Faça o login</h2>

				<b-form>
					<b-form-group label="E-mail" label-for="email">
						<b-form-input
							id="email"
							type="email"
							placeholder="nome@email.com"
							autocomplete="off"
							v-model.trim="$v.form.email.$model"
							:state="getValidation('email')"
						></b-form-input>
					</b-form-group>

					<b-form-group label-for="password">
						<label class="d-flex justify-content-between">
							Senha
							<small><a href="#">Esqueceu sua senha?</a></small>
						</label>

						<b-form-input
							id="password"
							type="password"
							placeholder="Digite sua senha"
							v-model.trim="$v.form.password.$model"
							:state="getValidation('password')"
						></b-form-input>
					</b-form-group>

					<b-button type="button" variant="primary" block @click="login">
						<b-icon icon="box-arrow-in-right"></b-icon> Entrar
					</b-button>

					<hr />

					<b-button
						type="button"
						variant="outline-secondary"
						block
						@click="goToRegister"
					>
						<b-icon icon="person-plus-fill"></b-icon> Não tenho conta
					</b-button>
				</b-form>
			</div>
		</b-col>
		<b-col md="3" sm="1"></b-col>
	</b-row>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	text-decoration: none;
}

.left-login {
	background-color: #f2f2f2;
}

.title-login {
	font-weight: bold;
}

.img-login {
	width: 600px;
	height: 600px;
}
</style>
