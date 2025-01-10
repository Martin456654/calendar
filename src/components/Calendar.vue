<template>
    
<div class="flex flex-col gap-5 mx-5">
	<div class="flex gap-5 flex-col lg:flex-row">
		<div class="bg-gray-100 p-[20px_30px] rounded-[7px]">
			<div class="flex justify-between items-center mb-5">
				<button @click="prevMonth" :disabled="isPast"
					class="bg-white border-2 border-gray-500 w-7 h-7 flex justify-center items-center rounded"
					:class="{ 'opacity-30': isPast }">

					<i class='bx bx-chevron-left text-gray-600 text-bold shadow-md' style="font-size: 20px;"></i>
				</button>
		
				<span class="text-gray-600 font-bold text-lg flex gap-2 items-center flex-col md:flex-row">
					<span>
						{{ fromYear }} {{ monthName(fromMonth) }}
					</span>

					<span>-</span>

					<span>
						{{toYear}} {{ monthName(toMonth) }}
					</span>
				</span>
		
				<button @click="nextMonth" class="bg-white border-2 border-gray-500 w-7 h-7 flex justify-center items-center rounded">
					<i class='bx bx-chevron-right text-gray-600 text-bold shadow-md' style="font-size: 20px;"></i>
				</button>
			</div>  

			<div class="flex gap-5 flex-col md:flex-row">
				<CalendarMonth
				  v-for="(month, index) in monthsData"
				  :key="index"
				  :order="index"
				  :year="month.year"
				  :month="month.month"
				  :selection-from-date="selectionFromDate"
				  :selection-to-date="selectionToDate"
				  :selected-days-by-order="selectedDaysToHighlight"
				  :too-much-days="tooMuchDays"
				  @days-ranges-handle="handleDaysRangesHandle"
				  @date-selected="handleDateSelected"
				  @handle-mouse-over="handleMouseOver"
				/>
			</div>
		
			<div class="mt-5 text-center">
				<h3 class="mb-5">
					{{ $t("stay.prefix") }} 
					{{ getLocalizedUnit(totalDays, { single: "stay.dayForms.single", few: "stay.dayForms.few", many: "stay.dayForms.many" }) }}.
					({{ getLocalizedUnit(totalNights, { single: "stay.nightForms.single", few: "stay.nightForms.few", many: "stay.nightForms.many" }) }})
				</h3>
		
				<span v-if="tooMuchDays" class="p-2 bg-red-400 text-white rounded">
					{{ $t("labels.maxStay") }}
				</span>
			</div>
		</div>
		
		<div class="bg-gray-100 p-[25px_30px] rounded-[7px] flex flex-col items-center gap-3">
			<button
				v-for="(item, index) in favouriteMonths"
				:key="index"
				class="bg-gray-300 px-5 py-2 rounded transition-all duration-100 hover:bg-gray-400 active:bg-gray-500"
				@click="setMonthsRange(item)">

				{{ item.label }}
			</button>
		</div>
	</div> 

	<div class="bg-gray-100 p-[25px_30px] rounded-[7px] flex items-center gap-3 justify-center">
		<div class="flex flex-wrap gap-2 justify-center">
			<button
				v-for="(lang, index) in languages"
				:key="index"
				@click="setLanguage(lang.code)"
				class="bg-gray-300 px-4 py-2 rounded transition-all duration-100 hover:bg-gray-400 active:bg-gray-500">

				{{ lang.label }}
			</button>
		</div>
	</div>
</div>

</template>

<script>

import CalendarMonth from './CalendarMonth.vue';
import { useI18n } from 'vue-i18n';

export default {
 	 props: {
		maximumBookingDays: {
			type: Number,
			required: false,
			default: 30
		},
		callendarBegins: {
			type: Date,
			required: false,
			default: new Date()
		},
		lang: {
			type: String,
			required: false,
			default: 'cs'
		},
		presetDates: {
			type: Object,
			required: false,
			default: null
		},
		favouriteMonthsProp: {
			type: Array,
			required: false
		}
  	},
  	components: {
    	CalendarMonth
  	},
  	setup() {
    	const { locale } = useI18n();

		const setLanguage = (lang) => {
			locale.value = lang;
		};

		return {
			setLanguage
		};
 	 },
  	data(){
    	return{
			fromYear: null,
			fromMonth: null,

			toYear: null,
			toMonth: null,

			selectionFromDate: null,
			selectionProcessDate: null,
			selectionToDate: null,

			selectedDaysToHighlight: { "0": [], "1": [] },
			selectedDaysToShow: { "0": [], "1": [] },
			monthsRanges: {
				"0": {
					"starts": null,
					"ends": null
				},
				"1": {
					"starts": null,
					"ends": null
				}
			},
			languages: [
				{ code: 'cs', label: 'Čeština' },
				{ code: 'sk', label: 'Slovenčina' },
				{ code: 'en', label: 'English' },
				{ code: 'de', label: 'Deutsch' },
				{ code: 'pl', label: 'Polski' },
				{ code: 'uk', label: 'Українська' },
				{ code: 'es', label: 'Español' },
			]
    	}
  	},
	created(){
		const currentDate = this.callendarBegins;

		this.fromYear = currentDate.getFullYear();
		this.fromMonth = currentDate.getMonth();

		this.setLanguage(this.lang);

		if(this.presetDates){
			this.handleDateSelected(this.presetDates.from);
		
			this.handleMouseOver(this.presetDates.to);
			this.handleDateSelected(this.presetDates.to);
		}
	},
	computed: {
		favouriteMonths() {
			if (this.favouriteMonthsProp) {
				return this.favouriteMonthsProp;
			}

			const currentDate = this.callendarBegins;
			const predefinedMonths = [
				{ label: "Last minute", fromMonth: currentDate.getMonth(), toMonth: currentDate.getMonth() + 1, year: currentDate.getFullYear() },
				{ label: `${this.$t('months.0')} / ${this.$t('months.1')} 2025`, fromMonth: 0, toMonth: 1, year: 2025 },
				{ label: `${this.$t('months.2')} / ${this.$t('months.3')} 2025`, fromMonth: 2, toMonth: 3, year: 2025 },
				{ label: `${this.$t('months.4')} / ${this.$t('months.5')} 2025`, fromMonth: 4, toMonth: 5, year: 2025 },
				{ label: this.$t('labels.summerHolidays'), fromMonth: 7, toMonth: 8, year: 2025 }
			];

			return predefinedMonths;
		},
		isPast() {
			const currentDate = this.callendarBegins;
			const fromDate = new Date(this.fromYear, this.fromMonth);
			return fromDate < currentDate;
		},
		totalDays(){
			return this.selectedDaysToShow[0].length + this.selectedDaysToShow[1].length;
		},
		totalNights(){
			if (this.totalDays === 0) return 0;
			return this.totalDays - 1;
		},
		tooMuchDays(){
			if (this.totalDays <= this.maximumBookingDays) return false;
			return true;
		},
		monthsData(){
			return [
				{ year: this.fromYear, month: this.fromMonth },
				{ year: this.toYear, month: this.toMonth }
			];
		}
	},
	watch: {
		fromMonth() {
			this.toYear = this.fromYear;
			this.toMonth = this.fromMonth + 1;

			if (this.toMonth > 11) {
				this.toMonth = 0;
				this.toYear++;
			}
		}
	},
	methods: {
		prevMonth() {
			if(this.selectionFromDate){
				let confirmSwitch = confirm(this.$t("labels.resetConfirmation"));
				if (!confirmSwitch) return;

				this.clearDatesSelection();
				this.selectionFromDate = null;
				this.selectionToDate = null;
			}

			let newMonth = this.fromMonth - 1;
			let newYear = this.fromYear;
			if (newMonth < 0) {
				newMonth = 11;
				newYear--;
			}

			this.fromYear = newYear;
			this.fromMonth = newMonth;
		},
		nextMonth() {
			if(this.selectionFromDate){
				let confirmSwitch = confirm(this.$t("labels.resetConfirmation"));
				if (!confirmSwitch) return;

				this.clearDatesSelection();
				this.selectionFromDate = null;
				this.selectionToDate = null;
			}

			let newMonth = this.fromMonth + 1;
			let newYear = this.fromYear;
			if (newMonth > 11) {
				newMonth = 0;
				newYear++;
			}

			this.fromYear = newYear;
			this.fromMonth = newMonth;
		},
		monthName(month) {
			const months = [
				this.$t('months.0'),
				this.$t('months.1'),
				this.$t('months.2'),
				this.$t('months.3'),
				this.$t('months.4'),
				this.$t('months.5'),
				this.$t('months.6'),
				this.$t('months.7'),
				this.$t('months.8'),
				this.$t('months.9'),
				this.$t('months.10'),
				this.$t('months.11')
			];

			return months[month];
		},
		handleDateSelected(data) {
			const { selectionFromDate, selectionToDate } = this;

			if (selectionToDate) {
				this.clearDatesSelection();
				this.selectionFromDate = null;
				this.selectionToDate = null;
			} else if (selectionFromDate) {
				this.selectionToDate = data;
			} else {
				this.selectionFromDate = data;
				this.clearDatesSelection();
				this.selectedDaysToShow[data.order].push(data.date);
			}
		},
		handleMouseOver(data) {
			if(this.selectionToDate) return;

			this.selectionProcessDate = data;
			
			const fromDate = this.selectionFromDate;
			const processDate = this.selectionProcessDate;
			const sameOrder = fromDate.order === processDate.order;

			this.clearDatesSelection();

			if (sameOrder) {
				const isAscending = fromDate.date < processDate.date;
				const start = isAscending ? fromDate.date + 1 : fromDate.date - 1;
				const end = isAscending ? processDate.date - 1 : processDate.date + 1;
				const step = isAscending ? 1 : -1;

				if (Math.abs(fromDate.date - processDate.date) > 1) {
					for (let i = start; isAscending ? i <= end : i >= end; i += step) {
						this.selectedDaysToHighlight[fromDate.order].push(i);
					}

					for (let i = start - step; isAscending ? i <= end + step : i >= end + step; i += step) {
						if (!this.selectedDaysToShow[fromDate.order].includes(i)) {
							this.selectedDaysToShow[fromDate.order].push(i);
						}
					}

				}else{
					if (!this.selectedDaysToShow[fromDate.order].includes(fromDate.date)) {
						this.selectedDaysToShow[fromDate.order].push(fromDate.date);
					}

					if (!this.selectedDaysToShow[fromDate.order].includes(processDate.date)) {
						this.selectedDaysToShow[fromDate.order].push(processDate.date);
					}
				}
			}else if(fromDate.order < processDate.order){
				for (let i = fromDate.date + 1; i <= this.monthsRanges[0].ends; i++){
					this.selectedDaysToHighlight[0].push(i);
				}
				for (let i = fromDate.date; i <= this.monthsRanges[0].ends; i++){
					this.selectedDaysToShow[0].push(i);
				}


				for (let i = this.monthsRanges[1].starts; i <= processDate.date - 1; i++){
					this.selectedDaysToHighlight[1].push(i);
				}
				for (let i = this.monthsRanges[1].starts; i <= processDate.date; i++){
					this.selectedDaysToShow[1].push(i);
				}
			}else if(fromDate.order > processDate.order){
				for (let i = processDate.date + 1; i <= this.monthsRanges[0].ends; i++){
					this.selectedDaysToHighlight[0].push(i);
				}
				for (let i = processDate.date; i <= this.monthsRanges[0].ends; i++){
					this.selectedDaysToShow[0].push(i);
				}

				for (let i = 1; i <= fromDate.date - 1; i++){
					this.selectedDaysToHighlight[1].push(i);
				}
				for (let i = 1; i <= fromDate.date; i++){
					this.selectedDaysToShow[1].push(i);
				}
			}
		},
		clearDatesSelection(){
			this.selectedDaysToHighlight[0] = [];
			this.selectedDaysToHighlight[1] = [];

			this.selectedDaysToShow[0] = [];
			this.selectedDaysToShow[1] = [];
		},
		handleDaysRangesHandle(data){
			this.monthsRanges[data.order].starts = 1;
			this.monthsRanges[data.order].ends = Object.keys(data.days).length;
		},
		setMonthsRange({fromMonth, year}){
			if(this.selectionFromDate){
				let confirmSwitch = confirm(this.$t("labels.resetConfirmation"));
				if (!confirmSwitch) return;

				this.clearDatesSelection();
				this.selectionFromDate = null;
				this.selectionToDate = null;
			}

			this.fromMonth = fromMonth;
			this.fromYear = year;
		},
		getLocalizedUnit(count, forms) {
			if (count === 1) {
				return `1 ${this.$t(forms.single)}`;
			} else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count)) {
				return `${count} ${this.$t(forms.few)}`;
			} else {
				return `${count} ${this.$t(forms.many)}`;
			}
		}
  	}
}

</script>