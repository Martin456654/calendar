<template>

<div class="bg-white flex flex-col items-center max-w-xs mx-auto shadow-xl rounded p-4">
	<div class="grid grid-cols-7 gap-2 w-full">
		<div v-for="day in daysOfWeek" :key="day" class="text-gray-500 flex justify-center items-center h-10 w-8">
			{{ day.slice(0, 2) }}
		</div>

		<div 
			v-for="day in daysInMonth" 
			:key="day.date" 
			class="flex justify-center items-center h-8 rounded-md cursor-pointer transition-all duration-100"
			:class="{
				'text-gray-400 cursor-not-allowed': day.isPast,
				'bg-gray-100 text-gray-600 font-bold': day.isToday,
				'hover:bg-black hover:text-white hover:shadow-xl hover:opacity-80': !day.isPast && !day.isToday && day.date != null,
				'bg-black text-white shadow-xl opacity-80': selectionFromDate?.order === order && selectionFromDate?.date === day.date ||
															selectionToDate?.order === order && selectionToDate?.date === day.date,
				'bg-gray-300 shadow-xl': selectedDaysByOrder[order].some(d => d === day.date),
				'bg-red-300 shadow-xl': selectedDaysByOrder[order].some(d => d === day.date) &&tooMuchDays,
				'pointer-events-none': day.isPast || day.isToday || day.date == null
			}"
			:disabled="day.isPast && !day.isToday"
			@click="selectDate(day)"
			@mouseover="handleMouseOver(day.date)">

			<span v-if="day.date">{{ day.date }}</span>
		</div>
	</div>
</div>

</template>

<script>

export default {
	props: {
		year: {
			type: Number,
			required: true,
		},
		month: {
			type: Number,
			required: true,
		},
		order: {
			type: Number,
			required: true
		},
		selectionFromDate: {
			type: Object,
			required: true
		},
		selectionToDate: {
			type: Object,
			required: true
		},
		selectedDaysByOrder: {
			type: Object,
			required: true
		},
		tooMuchDays: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		daysOfWeek() {
			return [
				this.$t("days.6"),
				this.$t("days.0"),
				this.$t("days.1"),
				this.$t("days.2"),
				this.$t("days.3"),
				this.$t("days.4"),
				this.$t("days.5"),
			];
		},
		daysInMonth() {
			const firstDayOfMonth = new Date(this.year, this.month, 1);
			const lastDayOfMonth = new Date(this.year, this.month + 1, 0);
			const days = [];
		
			for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
				days.push({ date: null });
			}
		
			for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
				const date = new Date(this.year, this.month, i);
				const today = this.$parent.callendarBegins;
				const isToday = date.toDateString() === today.toDateString();
				const isPast = date < today;
				
				days.push({
					date: i,
					isToday: isToday,
					isPast: isPast,
				});
			}

			this.$emit('days-ranges-handle', { order: this.order, days: days.filter(day => day.date != null) });
		
			return days;
		},
	},
  	methods: {
		selectDate(data) {
			console.log(data);

			if(data.date != null && !this.tooMuchDays && !data.isPast && !data.isToday) {
				this.$emit('date-selected', { order: this.order, date: data.date});
			}
		},
		handleMouseOver(date) {
			this.$emit('handle-mouse-over', { order: this.order, date: date});
		}
  	}
};

</script>