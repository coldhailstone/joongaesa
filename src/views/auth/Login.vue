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
						autoComplete="off"
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
							<img class="google-icon" src="@/assets/google-icon.png" />
						</div>
						<p class="btn-text fw-bold w-100">구글 로그인</p>
					</div>
				</div>
			</div>
		</b-card>
	</div>
</template>

<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const { notify } = useNotification();

let email = ref('');
let password = ref('');
const user = computed(() => store.state.user.user);
const setLoading = (isLoading) => store.commit('loading/SET_LOADING', isLoading);
const fetchUser = () => store.dispatch('user/FETCH_USER');
const setPersistence = () => store.dispatch('user/SET_PERSISTENCE');
const signInWithEmail = (payload) => store.dispatch('user/SIGN_IN_WITH_EMAIL', payload);
const signInWithPopup = () => store.dispatch('user/SIGN_IN_WITH_POPUP');
const login = async (type) => {
	try {
		setLoading(true);
		await setPersistence();
		if (type === 'email') {
			await signInWithEmail({ email: email.value, password: password.value });
		} else if (type === 'google') {
			await signInWithPopup();
		}

		await fetchUser();
		if (user.value.emailVerified) {
			router.push('/');
			notify({ type: 'success', text: '로그인에 성공했습니다.' });
		} else {
			notify({ type: 'error', text: '이메일 인증이 필요합니다.' });
		}
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		setLoading(false);
	}
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
		margin-top: 8px;
		width: 26px;
		height: 26px;
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
