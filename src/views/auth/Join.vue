<template>
	<div class="d-flex align-items-center justify-content-center h-75">
		<b-card header="회원가입" align="center">
			<b-form
				class="d-flex flex-column align-items-center justify-content-center gap-3 h-75"
				style="min-width: 290px; max-width: 460px"
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
						required
					/>
				</b-input-group>

				<b-button class="w-100" type="submit" variant="primary">
					가입하기
				</b-button>

				<spinner v-show="isLoading" />
			</b-form>
		</b-card>
	</div>
</template>

<script>
import { createUserWithEmail, sendEmailVerify } from '@/api/firebase';
import Spinner from '@/components/common/Spinner.vue';

export default {
	name: 'Join',
	components: {
		Spinner,
	},
	data() {
		return {
			isLoading: false,
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
		async join() {
			if (!this.validation()) return;

			this.isLoading = true;
			try {
				await createUserWithEmail(this.email, this.password);
				await sendEmailVerify();

				this.$notify({
					type: 'success',
					text: '이메일을 전송했습니다.',
				});
				this.$router.push({ name: 'login' });
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
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
