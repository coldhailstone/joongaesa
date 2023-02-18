<template>
	<div class="d-flex align-items-center justify-content-center h-75">
		<b-card header="중개사닷컴" align="center">
			<b-form
				class="d-flex flex-column align-items-center justify-content-center gap-3 h-75"
				style="min-width: 290px; max-width: 460px"
				@submit="login"
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

				<b-button class="w-100" type="submit" variant="primary">
					로그인
				</b-button>
				<b-button
					class="w-100"
					variant="dark"
					@click="$router.push({ name: 'join' })"
				>
					회원가입
				</b-button>
			</b-form>
		</b-card>
	</div>
</template>

<script>
import { signInWithEmail } from '@/api/firebase';

export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: '',
		};
	},
	methods: {
		async login() {
			try {
				await signInWithEmail(this.email, this.password);
			} catch (error) {
				console.log(error.message);
			}
		},
	},
};
</script>
