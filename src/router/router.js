import main from "@/pages/main.vue";
import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main.vue";
import Counter from "@/pages/Counter.vue";
import Notes from "@/pages/Notes.vue";

const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/counter',
		component: Counter
	},
	{
		path: '/notes',
		component: Notes
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(),
	linkActiveClass: 'active',
	linkExactActiveClass: 'current',
})

export default router