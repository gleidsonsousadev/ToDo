
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
						>
						</b-form-input>
					</b-form-group>

					<b-button type="button" variant="primary">
						<b-icon icon="box-arrow-in-right"></b-icon>
						Entrar
					</b-button>

					<b-button
						type="button"
						variant="outline-secondary"
						block
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
