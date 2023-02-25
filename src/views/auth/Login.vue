<template>
	<div class="login-wrapper d-flex align-items-center justify-content-center">
		<b-card header="중개사닷컴" align="center">
			<b-form
				class="form d-flex flex-column align-items-center justify-content-center gap-3 h-75"
				@submit="login('email')"
			>
				<b-input-group
					prepend-html="<i class='fa-regular fa-envelope'></i>"
					class="mb-2 mr-sm-2 mb-sm-0"
				>
					<b-form-input
						v-model="email"
						type="email"
						placeholder="아이디(이메일)"
						required
					/>
				</b-input-group>
				<b-input-group
					prepend-html="<i class='fa-solid fa-lock'></i>"
					class="mb-2 mr-sm-2 mb-sm-0"
				>
					<b-form-input
						v-model="password"
						type="password"
						placeholder="비밀번호"
						required
					/>
				</b-input-group>

				<b-button class="w-100" type="submit" variant="primary"> 로그인 </b-button>
				<b-button class="w-100" variant="dark" @click="$router.push('join')">
					회원가입
				</b-button>
			</b-form>

			<div>
				<hr class="my-12" />
				<div class="d-flex justify-content-center">
					<div class="google-btn d-flex justify-content-between" @click="login('google')">
						<div class="google-icon-wrapper">
							<img
								class="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
							/>
						</div>
						<p class="btn-text fw-bold w-100">구글 로그인</p>
					</div>
				</div>
			</div>
		</b-card>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
	name: 'WithEmail',
	data() {
		return {
			email: '',
			password: '',
		};
	},
	computed: {
		...mapState('user', ['user']),
	},
	methods: {
		...mapMutations('loading', ['SET_LOADING']),
		...mapMutations('user', ['SET_USER']),
		...mapActions('user', [
			'FETCH_USER',
			'SET_PERSISTENCT',
			'SIGN_IN_WITH_POPUP',
			'SIGN_IN_WITH_EMAIL',
		]),
		async login(type) {
			this.SET_LOADING(true);
			try {
				await this.SET_PERSISTENCT();
				if (type === 'email') {
					await this.SIGN_IN_WITH_EMAIL({ email: this.email, password: this.password });
				} else if (type === 'google') {
					await this.SIGN_IN_WITH_POPUP();
				}

				await this.FETCH_USER();
				if (this.user.emailVerified) {
					this.$notify({
						type: 'success',
						text: '로그인에 성공했습니다.',
					});
					this.$router.push('/');
				} else {
					this.$notify({
						type: 'error',
						text: '이메일 인증이 필요합니다.',
					});
				}
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.SET_LOADING(false);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login-wrapper {
	height: 100dvh !important;
	.form {
		min-width: 290px;
		max-width: 460px;
	}
}

@import url(https://fonts.googleapis.com/css?family=Roboto:500);
$google-blue: #4285f4;
$button-active-blue: #1669f2;
.google-btn {
	width: 184px;
	height: 42px;
	background-color: $google-blue;
	border-radius: 2px;
	box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
	cursor: pointer;
	.google-icon-wrapper {
		margin-top: 1px;
		margin-left: 1px;
		width: 40px;
		height: 40px;
		border-radius: 2px;
		background-color: #fff;
	}
	.google-icon {
		margin-top: 12px;
		width: 18px;
		height: 18px;
	}
	.btn-text {
		float: right;
		margin: 11px 11px 0 0;
		color: #fff;
		font-size: 14px;
		letter-spacing: 0.2px;
		font-family: 'Roboto';
	}
	&:hover {
		box-shadow: 0 0 6px $google-blue;
	}
	&:active {
		background: $button-active-blue;
	}
}
</style>
