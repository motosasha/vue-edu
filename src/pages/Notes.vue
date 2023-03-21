<template>
	<h1 class="text-6xl">Notes list:</h1>
	<div class="max-w-lg">
		<div class="flex gap-4 my-8">
			<input
				class="block w-full px-5 py-3 bg-white border-none rounded-lg placeholder-slate-500
      focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500
      text-slate-800"
				type="text"
				placeholder="Note name"
				v-model="inputValue"
				@keypress.enter="addNewNote"
			>
			<button class="px-10 py-3 font-semibold bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:bg-slate-700 disabled:text-slate-500" @click="addNewNote" :disabled="!inputValue">Add</button>
		</div>
		<div class="border border-slate-600 text-center p-4 rounded-xl" v-if="notes.length === 0">No notes, add one</div>
		<ul class="flex flex-col gap-5" v-else>
			<li class="bg-slate-300 rounded-xl text-slate-800 p-3 pl-5 flex items-center justify-between" v-for="note in notes" :key="note.date">
				<div class="flex-col gap-4">
					<time class="text-xs">{{ dateFormat(note.date) }}</time>
					<h2 class="font-bold">{{ note.id }}: {{ note.title }}</h2>
				</div>
				<button class="px-10 py-3 font-semibold bg-red-700 text-white rounded-lg hover:bg-red-800" @click="removeNote(note.id)">Remove</button>
			</li>
		</ul>
	</div>
</template>

<script>
import {dateSort} from "@/functions/dateSort";
import {dateFormat} from "@/functions/dateFormat";

let maxId = 0;
export default {
	name: "Notes",
	data() {
		return {
			inputValue: '',
			noteCounter: 0,
			notes: []
		}
	},
	mounted() {
		if (localStorage.notes) {
			this.notes = JSON.parse(localStorage.notes).sort(dateSort)
			this.noteCounter = +localStorage.noteCounter
		} else if (this.notes) {
			this.notes.sort(dateSort)
			for (let note of this.notes) {
				maxId = maxId > note.id ? maxId : note.id
			}
			this.noteCounter = maxId
			localStorage.setItem('noteCounter', String(maxId))
			localStorage.setItem('notes', String(this.notes))
		} else {
			localStorage.setItem('noteCounter', String(this.noteCounter))
		}
	},
	methods: {
		addNewNote() {
			if (this.inputValue !== '') {
				this.noteCounter = +localStorage.noteCounter
				this.notes.unshift({
					id: this.noteCounter + 1,
					title: this.inputValue,
					date: Date.now()
				})
				this.inputValue = ''
				localStorage.setItem('noteCounter', String(++this.noteCounter))
				localStorage.setItem('notes', JSON.stringify(this.notes))
			}
		},
		removeNote(id) {
			this.notes = this.notes.filter((el) => el.id !== id);
			localStorage.setItem('notes', JSON.stringify(this.notes))
			if (!this.notes.length) {
				this.noteCounter = 0
				localStorage.setItem('noteCounter', String(0))
			}
		},
		dateFormat(date) {
			return dateFormat(date)
		},
	}
}
</script>