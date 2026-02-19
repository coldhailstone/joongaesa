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

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';

interface Props {
	list: [];
}

const props = defineProps<Props>();
const emit = defineEmits(['changeFile']);

let attachments: Ref<File[]> = ref([]);
const file: Ref<DataTransfer> = ref(null);
const dropFile = (e) => {
	file.value = e.dataTransfer;
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
	border: 2px dashed #d1d5db;
	border-radius: 8px;
	position: relative;
	background-color: #fafafa;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: border-color 0.15s ease, background-color 0.15s ease;

	&:hover {
		border-color: #2563eb;
		background-color: rgba(37, 99, 235, 0.03);
	}

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
		pointer-events: none;

		p {
			font-size: 0.85rem;
			color: #9ca3af;
			margin-bottom: 0.5rem;
		}

		h6 {
			font-size: 0.8rem;
			color: #2563eb;
			font-weight: 600;
		}
	}
}

.file-list {
	width: 100%;
	padding-left: 0;
	margin-top: 8px;

	li {
		display: flex;
		align-items: center;
		height: 44px;
		border-radius: 8px;
		border: 1px solid #e5e7eb;
		padding: 0 12px;
		margin-top: 6px;
		background: #f9fafb;

		i.fa-regular {
			color: #6b7280;
			font-size: 0.9rem;
		}

		p {
			margin-bottom: 0;
			margin-left: 8px;
			font-size: 0.85rem;
			font-weight: 500;
			color: #374151;
		}

		.close {
			margin-left: auto;
			cursor: pointer;
			color: #9ca3af;
			font-size: 0.85rem;
			transition: color 0.15s ease;

			&:hover {
				color: #ef4444;
			}
		}
	}
}
</style>
