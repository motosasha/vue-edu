<template>
	<h1 class="text-6xl">Notes list LC:</h1>
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
import {NOTE_ID_PREFIX} from "@/utils/constants";

export default {
	name: "Notes",
	data() {
		return {
			inputValue: '',
			notesCounter: 0,
			notes: []
		}
	},
	mounted() {
		const notesList = []
		Object.keys(localStorage).filter((item) => {
			if (item.includes(NOTE_ID_PREFIX)) {
				notesList.unshift(JSON.parse(localStorage[item]))
			}
		})

		if (notesList.length) {
			this.notes = notesList.sort(dateSort);
			this.notesCounter = +localStorage.notesCounter
		} else if (this.notes.length) {
			this.notes.sort(dateSort)
			let maxId = 0;
			for (let note of this.notes) {
				maxId = maxId > note.id ? maxId : note.id

				localStorage.setItem(NOTE_ID_PREFIX + note.id, JSON.stringify(note))
				localStorage.setItem('notesCounter', String(maxId))
				this.notesCounter = maxId
			}
		} else {
			localStorage.setItem('notesCounter', String(this.notesCounter))
		}
	},
	methods: {
		addNewNote() {
			if (this.inputValue !== '') {
				const id = +(++this.notesCounter);
				const note = {
					id,
					title: this.inputValue,
					date: Date.now()
				}
				this.notes.unshift(note)
				this.inputValue = ''
				localStorage.setItem('notesCounter', String(id))
				localStorage.setItem(NOTE_ID_PREFIX + id, JSON.stringify(note))
			}
		},
		removeNote(id) {
			this.notes = this.notes.filter((el) => el.id !== id);
			localStorage.removeItem(NOTE_ID_PREFIX + id)
			if (!this.notes.length) {
				this.notesCounter = 0
				localStorage.setItem('notesCounter', String(0))
			}
		},
		dateFormat(date) {
			return dateFormat(date)
		},
	},
}
</script>