<template>
	<div class="flex gap-5">
		<router-link to="/" class="nav-link">Home</router-link>
		<router-link to="/counter" class="nav-link">Counter</router-link>
		<router-link to="/notes" class="nav-link">Notes (lc-one)</router-link>
		<router-link to="/noteslc" class="nav-link">Notes (lc-many)</router-link>
	</div>
</template>

<script>
export default {
	name: "NavBar"
}
</script>

<style scoped>
	.nav-link {
		@apply hover:text-amber-600
	}
	.nav-link.active {
		@apply text-amber-500 pointer-events-none
	}
</style>