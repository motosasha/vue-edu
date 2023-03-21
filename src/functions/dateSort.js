export function dateSort(a, b) {
	if (a.date > b.date) return -1;
	if (a.date === b.date) return 0;
	if (a.date < b.date) return 1;
}