import {DATE_FULL_FORMAT} from "@/utils/constants";

export function dateFormat(date) {
	return new Date(+date).toLocaleString('ru-RU', DATE_FULL_FORMAT)
}