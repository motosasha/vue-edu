<template>
	<h1 class="text-6xl">{{ title }}</h1>
	<div class="max-w-lg">
		<div class="flex gap-4 my-8">
			<input
				class="block w-full px-5 py-3 bg-white border-none rounded-lg placeholder-slate-500
      focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500
      text-slate-800"
				type="text"
				:placeholder="placeholderStr"
				v-model="inputValue"
				@keypress.enter="addNewNote"
			>
			<button class="px-10 py-3 font-semibold bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:bg-slate-700 disabled:text-slate-500" @click="addNewNote" :disabled="!inputValue">Add</button>
		</div>
		<div class="border border-slate-600 text-center p-4 rounded-xl" v-if="notes.length === 0" v-text="noNotes"></div>
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

function noteSort(a, b) {
	if (a.date > b.date) return -1;
	if (a.date === b.date) return 0;
	if (a.date < b.date) return 1;
}
export default {
	name: "Notes",
	data() {
		return {
			dateOptions: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
			title: 'Notes list LC:',
			placeholderStr: 'Note name',
			inputValue: '',
			noNotes: 'No notes, add one',
			notesCounter: 0,
			idPrefix: 'noteId-',
			notes: []
		}
	},
	mounted() {
		const notesList = []
		Object.keys(localStorage).filter((item) => {
			if (item.includes(this.idPrefix)) {
				notesList.unshift(JSON.parse(localStorage[item]))
			}
		})

		if (notesList.length) {
			this.notes = notesList.sort(noteSort);
			this.notesCounter = +localStorage.notesCounter
		} else if (this.notes.length) {
			this.notes.sort(noteSort)
			let maxId = 0;
			for (let note of this.notes) {
				maxId = maxId > note.id ? maxId : note.id

				localStorage.setItem(this.idPrefix + note.id, JSON.stringify(note))
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
				localStorage.setItem('notesCounter', id)
				localStorage.setItem(this.idPrefix + id, JSON.stringify(note))
			}
		},
		removeNote(id) {
			this.notes = this.notes.filter((el) => el.id !== id);
			localStorage.removeItem(this.idPrefix + id)
		},
		dateFormat(date) {
			return new Date(+date).toLocaleString('ru-RU', this.dateOptions)
		},
	}
}
</script>