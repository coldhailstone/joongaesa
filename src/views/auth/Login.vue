<template>
	<div class="d-flex align-items-center justify-content-center h-75">
		<b-card header="중개사닷컴" align="center">
			<b-form
				class="d-flex flex-column align-items-center justify-content-center gap-3 h-75"
				style="min-width: 290px; max-width: 460px"
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

				<b-button class="w-100" type="submit" variant="primary">
					로그인
				</b-button>
				<b-button
					class="w-100"
					variant="dark"
					@click="$router.push('join')"
				>
					회원가입
				</b-button>

				<spinner v-show="isLoading" />
			</b-form>

			<div>
				<hr class="my-12" />
				<div class="d-flex justify-content-center">
					<div class="google-btn" @click="login('google')">
						<div class="google-icon-wrapper">
							<img
								class="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
							/>
						</div>
						<p class="btn-text"><b>Sign in with google</b></p>
					</div>
				</div>
			</div>
		</b-card>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import {
	signInWithEmail,
	signInWithGoogle,
	getUser,
	setPersistenceSession,
} from '@/api/firebase';
import Spinner from '@/components/common/Spinner.vue';

export default {
	name: 'WithEmail',
	components: {
		Spinner,
	},
	data() {
		return {
			isLoading: false,
			email: '',
			password: '',
		};
	},
	methods: {
		...mapMutations('user', ['SET_USER']),
		async login(type) {
			this.isLoading = true;
			try {
				await setPersistenceSession();
				if (type === 'email') {
					await signInWithEmail(this.email, this.password);
				} else if (type === 'google') {
					await signInWithGoogle();
				}

				const user = getUser();
				if (user.emailVerified) {
					this.SET_USER(user);
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
				this.isLoading = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:500);
$white: #fff;
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
		position: absolute;
		margin-top: 1px;
		margin-left: 1px;
		width: 40px;
		height: 40px;
		border-radius: 2px;
		background-color: $white;
	}
	.google-icon {
		margin-top: 12px;
		width: 18px;
		height: 18px;
	}
	.btn-text {
		float: right;
		margin: 11px 11px 0 0;
		color: $white;
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
