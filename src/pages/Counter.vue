<template>
	<h1 class="text-6xl">
		Counter: <span class="font-bold text-amber-500" v-text="counter"></span>
	</h1>
	<div class="flex gap-3 mt-10">
		<button class="px-10 pt-2 pb-4 font-semibold text-4xl bg-amber-700 text-white rounded-full hover:bg-amber-800" v-on:click="counter--">−</button>
		<button class="px-10 pt-2 pb-4 font-semibold text-4xl bg-amber-800 text-white rounded-full hover:bg-amber-900" v-on:click="counter++">+</button>
	</div>
</template>

<script>
export default {
	name: "Counter",
	data() {
		return {
			counter: 0
		}
	}
}
</script>