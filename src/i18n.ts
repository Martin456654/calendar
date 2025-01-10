import { createI18n } from 'vue-i18n';

type MessageSchema = {
  months: string[];
  days: string[];
  stay: {
    prefix: string;
    dayForms: { single: string; few: string; many: string };
    nightForms: { single: string; few: string; many: string };
  };
  labels: {
    lastMinute: string;
    summerHolidays: string;
    maxStay: string;
    resetConfirmation: string;
  };
};

const messages: Record<string, MessageSchema> = {
	cs: {
		months: [
			"Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
			"Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
		],
		days: [
			"Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"
		],
		stay: {
			prefix: "Pobyt na",
			dayForms: { single: "den", few: "dny", many: "dní" },
			nightForms: { single: "noc", few: "noci", many: "nocí" }
		},
		labels: {
			lastMinute: "Last minute",
			summerHolidays: "Letní prázdniny",
			maxStay: "Překročili jste maximální počet dní, které je možné rezervovat.",
			resetConfirmation: "Pokud posunete měsíce, váš výběr se vynuluje. Chcete pokračovat?"
		}
	},
	sk: {
		months: [
			"Január", "Február", "Marec", "Apríl", "Máj", "Jún",
			"Júl", "August", "September", "Október", "November", "December"
		],
		days: [
			"Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"
		],
		stay: {
			prefix: "Pobyt na",
			dayForms: { single: "deň", few: "dni", many: "dní" },
			nightForms: { single: "noc", few: "noci", many: "nocí" }
		},
		labels: {
			lastMinute: "Last minute",
			summerHolidays: "Letné prázdniny",
			maxStay: "Překročili jste maximální počet dní, které je možné rezervovat.",
			resetConfirmation: "Ak posuniete mesiace, váš výber sa vynuluje. Chcete pokračovať?"
		}
	},
	en: {
		months: [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		],
		days: [
			"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
		],
		stay: {
			prefix: "Stay for",
			dayForms: { single: "day", few: "days", many: "days" },
			nightForms: { single: "night", few: "nights", many: "nights" }
		},
		labels: {
			lastMinute: "Last minute",
			summerHolidays: "Summer holidays",
			maxStay: "You have exceeded the maximum number of days that can be reserved.",
			resetConfirmation: "If you move the months, your selection will be reset. Do you want to continue?"
		}
	},
	de: {
		months: [
			"Januar", "Februar", "März", "April", "Mai", "Juni",
			"Juli", "August", "September", "Oktober", "November", "Dezember"
		],
		days: [
			"Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"
		],
		stay: {
			prefix: "Aufenthalt für",
			dayForms: { single: "Tag", few: "Tage", many: "Tage" },
			nightForms: { single: "Nacht", few: "Nächte", many: "Nächte" }
		},
		labels: {
			lastMinute: "Last Minute",
			summerHolidays: "Sommerferien",
			maxStay: "Sie haben die maximal buchbaren Tage überschritten.",
			resetConfirmation: "Wenn Sie die Monate verschieben, wird Ihre Auswahl zurückgesetzt. Möchten Sie fortfahren?"
		}
	},
	pl: {
		months: [
			"Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
			"Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
		],
		days: [
			"Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"
		],
		stay: {
			prefix: "Pobyt na",
			dayForms: { single: "dzień", few: "dni", many: "dni" },
			nightForms: { single: "noc", few: "noce", many: "nocy" }
		},
		labels: {
			lastMinute: "Last minute",
			summerHolidays: "Wakacje letnie",
			maxStay: "Przekroczyłeś maksymalną liczbę dni, które można zarezerwować.",
			resetConfirmation: "Jeśli przesuniesz miesiące, twój wybór zostanie zresetowany. Czy chcesz kontynuować?"
		}
	},
	uk: {
		months: [
			"Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
			"Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
		],
		days: [
			"Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота", "Неділя"
		],
		stay: {
			prefix: "Проживання на",
			dayForms: { single: "день", few: "дні", many: "днів" },
			nightForms: { single: "ніч", few: "ночі", many: "ночей" }
		},
		labels: {
			lastMinute: "Гарячі пропозиції",
			summerHolidays: "Літні канікули",
			maxStay: "Ви перевищили максимальну кількість днів для бронювання.",
			resetConfirmation: "Якщо ви зміните місяці, ваш вибір буде скинутий. Бажаєте продовжити?"
		}
	},
	es: {
		months: [
			"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
			"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
		],
		days: [
			"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
		],
		stay: {
			prefix: "Estancia de",
			dayForms: { single: "día", few: "días", many: "días" },
			nightForms: { single: "noche", few: "noches", many: "noches" }
		},
		labels: {
			lastMinute: "Última hora",
			summerHolidays: "Vacaciones de verano",
			maxStay: "Has superado el número máximo de días que se pueden reservar.",
			resetConfirmation: "Si cambias los meses, tu selección se restablecerá. ¿Quieres continuar?"
		}
	}
};

const i18n = createI18n({
  locale: 'cs', // Default language
  fallbackLocale: 'en', // Fallback language
  messages,
});

export default i18n;
