<script>
import { required, minLength, email } from '@vuelidate/lib/validators';

export default {
	data() {
		return {
			form: {
				email: '',
				senha: '',
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
		login() {
			this.$v.$touch();
			if (this.$v.$error) {
				return;
			}
		},

		register() { },
		
		getValidation(field) {
			if (this.$v.form.$dirty === false) {
				return null;
			}
			return !this.$v.form[field].$error;
		},
	},
};
</script>

<template>
	<b-row class="vh-100 vw-100 row-login">
		<b-col
			sm="12"
			class="d-flex justify-content-center align-items-center left-login"
		>
			<div class="col-8">
				<h2 class="text-center mb-5 title-login">Faça o Login</h2>
				<b-form>
					<b-form-group label="E-mail" label-for="email">
						<b-form-input
							id="email"
							type="email"
							placeholder="nome@email.com.br"
							autocomplete="off"
							v-model.trim="$v.form.email.$model"
							:state="getValidation('email')"
						>
						</b-form-input>
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
						>
						</b-form-input>
					</b-form-group>

					<b-button type="button" variant="primary" block @click="login">
						<b-icon icon="box-arrow-in-right"></b-icon>
						Entrar
					</b-button>

					<b-button
						type="button"
						variant="outline-secondary"
						block
						@click="register"
					>
						<b-icon icon="person-plus-fill"></b-icon>
						Não tenho conta
					</b-button>
				</b-form>
			</div>
		</b-col>
		<b-col sm="7"></b-col>
	</b-row>
</template>

<style>
.row-login {
	margin: 0;
}

.left-login {
	background-color: #f2f2f2;
}

.title-login {
	font-weight: bold;
}
</style>
