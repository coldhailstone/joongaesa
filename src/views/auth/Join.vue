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

<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const { notify } = useNotification();

let email: Ref<string> = ref('');
let password: Ref<string> = ref('');
let confirmPassword: Ref<string> = ref('');
const setLoading = (isLoading) => store.commit('loading/SET_LOADING', isLoading);
const createUserWithEmail = (payload) => store.dispatch('user/CREATE_USER_WITH_EMAIL', payload);
const sendEmailVerification = () => store.dispatch('user/SEND_EMAIL_VERIFICATION');
const validation = () => {
	if (password.value !== confirmPassword.value) {
		notify({ type: 'error', text: '비밀번호가 일치하지 않습니다.' });
		return false;
	}
	return true;
};
const join = async () => {
	if (!validation()) return;

	try {
		setLoading(true);
		await createUserWithEmail({ email: email.value, password: password.value });
		await sendEmailVerification();
		router.push('/login');
		notify({ type: 'success', text: '이메일을 전송했습니다.' });
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		setLoading(false);
	}
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
