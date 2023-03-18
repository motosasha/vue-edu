<template>
	<h1 class="text-6xl">{{ title }}</h1>
	<div class="max-w-lg">
		<div class="flex gap-4 my-8">
			<input
				class="block w-full px-5 py-3 bg-white border-none rounded-lg placeholder-slate-500
      focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500
      text-slate-800"
				type="text"
				v-bind:placeholder="placeholderStr"
				v-model="inputValue"
				v-on:keypress.enter="addNewNote"
			>
			<button class="px-10 py-3 font-semibold bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:bg-slate-700 disabled:text-slate-500" v-on:click="addNewNote" :disabled="!inputValue">Add</button>
		</div>
		<ul class="flex flex-col gap-5" v-if="notes.length !== 0">
			<li class="bg-slate-300 rounded-xl text-slate-800 p-3 pl-5 flex items-center justify-between" v-for="(note, index) in notes">
				{{ note }}
				<button class="px-10 py-3 font-semibold bg-red-700 text-white rounded-lg hover:bg-red-800" v-on:click="removeNote(index)">Remove</button>
			</li>
		</ul>
		<div class="border border-slate-600 text-center p-4 rounded-xl" v-else v-text="noNotes"></div>
	</div>
</template>

<script>
export default {
	name: "Notes",
	data() {
		return {
			title: 'Notes list:',
			placeholderStr: 'Note name',
			inputValue: '',
			noNotes: 'No notes, add one',
			notes: [
				'Hey, I\'m first note, you can delete me',
				'I\'m brother of note above'
			]
		}
	},
	methods: {
		addNewNote() {
			if (this.inputValue !== '') {
				this.notes.push(this.inputValue)
				this.inputValue = ''
			}
		},
		removeNote(index) {
			this.notes.splice(index, 1)
		}
	}
}
</script>