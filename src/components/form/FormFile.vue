<template>
	<div>
		<div class="file-box" @drop.prevent="dropFile">
			<input type="file" ref="file" accept=".jpg, .png" multiple @change="changeFile" />
			<div>
				<p>첨부할 파일을 마우스로 끌어오거나, 직접 선택해주세요</p>
				<h6>파일 선택</h6>
			</div>
		</div>
		<ul class="file-list">
			<li v-for="(item, index) in attachments" :key="`file_${index}`">
				<i class="fa-regular fa-file" />
				<p>{{ item.name }}</p>
				<i class="fa-solid fa-xmark close" @click="deleteFile(index)" />
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ list: Array });
const emit = defineEmits(['changeFile']);

let attachments = ref([]);
const file = ref(null);
const dropFile = (e) => {
	file.value.files = e.dataTransfer.files;
	changeFile();
};
const changeFile = () => {
	attachments.value = [...attachments.value, ...file.value.files];
	emit('changeFile', attachments.value);
};
const deleteFile = (index) => {
	attachments.value.splice(index, 1);
	emit('changeFile', attachments.value);
};
watch(
	() => props.list,
	(arr) => {
		attachments.value = arr;
	}
);
</script>

<style lang="scss" scoped>
.file-box {
	width: 100%;
	height: 120px;
	border: 1px dashed gray;
	border-radius: 4px;
	position: relative;
	background-color: #f9f9f9;
	display: flex;
	align-items: center;
	justify-content: center;
	input[type='file'] {
		width: 100%;
		height: inherit;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		cursor: pointer;
	}
	> div {
		font-size: 0.875rem;
		font-weight: 500;
		text-align: center;
		p {
			font-size: 0.875rem;
			color: #999;
			margin-bottom: 1rem;
		}
		button {
			height: 40px;
			width: 90px;
		}
	}
}
.file-list {
	width: 100%;
	padding-left: 0;
	li {
		display: flex;
		align-items: center;
		height: 48px;
		border-radius: 4px;
		border: 1px solid #ddd;
		padding: 0 8px;
		margin-top: 8px;
		p {
			margin-bottom: 0;
			margin-left: 8px;
			font-size: 0.875rem;
			font-weight: 500;
		}
		.close {
			margin-left: auto;
			cursor: pointer;
		}
	}
}
</style>
