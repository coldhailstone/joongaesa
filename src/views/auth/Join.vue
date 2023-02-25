<template>
	<div class="join-wrapper d-flex align-items-center justify-content-center">
		<b-card header="회원가입" align="center">
			<b-form
				class="form d-flex flex-column align-items-center justify-content-center gap-3 h-75"
				@submit="join"
			>
				<b-input-group
					prepend-html="<i class='fa-solid fa-envelope'></i>"
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
						autoComplete="off"
						required
					/>
				</b-input-group>
				<b-input-group
					prepend-html="<i class='fa-solid fa-lock'></i>"
					class="mb-2 mr-sm-2 mb-sm-0"
				>
					<b-form-input
						v-model="confirmPassword"
						type="password"
						placeholder="비밀번호 확인"
						autoComplete="off"
						required
					/>
				</b-input-group>

				<b-button class="w-100" type="submit" variant="primary"> 가입하기 </b-button>
			</b-form>
		</b-card>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
	name: 'Join',
	data() {
		return {
			email: '',
			password: '',
			confirmPassword: '',
		};
	},
	computed: {
		validationConfirmPassword() {
			return this.confirmPassword === this.password;
		},
	},
	methods: {
		...mapMutations('loading', ['SET_LOADING']),
		...mapActions('user', ['CREATE_USER_WITH_EMAIL', 'SEND_EMAIL_VERIFICATION']),
		async join() {
			if (!this.validation()) return;

			this.SET_LOADING(true);
			try {
				await this.CREATE_USER_WITH_EMAIL({ email: this.email, password: this.password });
				await this.SEND_EMAIL_VERIFICATION();

				this.$notify({
					type: 'success',
					text: '이메일을 전송했습니다.',
				});
				this.$router.push('login');
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.SET_LOADING(false);
			}
		},
		validation() {
			let validate = true;
			if (!this.validationConfirmPassword) {
				this.$notify({
					type: 'error',
					text: '비밀번호가 일치하지 않습니다.',
				});
				validate = false;
			}
			return validate;
		},
	},
};
</script>

<style lang="scss" scoped>
.join-wrapper {
	height: 100dvh !important;
	.form {
		min-width: 290px;
		max-width: 460px;
	}
}
</style>
