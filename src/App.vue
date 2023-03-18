<template>
	<header class="pt-12 pb-4">
		<div class="container mx-auto px-4">
			<h1 class="text-4xl font-bold">{{ title }}</h1>
		</div>
	</header>
	<nav class="py-5">
		<div class="container mx-auto px-4">
			<nav-bar></nav-bar>
		</div>
	</nav>
	<main class="py-8">
		<div class="container mx-auto px-4">
			<router-view></router-view>
		</div>
	</main>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
	components: { NavBar },
	data: () => ({
		title: 'My First Vue Apps:'
	})
}
</script>