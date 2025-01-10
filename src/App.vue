<template>
    <!-- Hlavní kontejner pro zobrazení kalendáře -->
    <div class="w-screen min-h-screen bg-[#3B9AC1] flex justify-center items-start pt-[20vh] pb-[10vh]">
        <!-- Komponenta kalendáře -->
        <Calendar />

        <!-- Zakomentovaná verze kalendáře s jinými parametry pro případnou úpravu -->
        <!-- 
        <Calendar
            :maximum-booking-days="20"
            :callendar-begins="new Date(new Date().setDate(new Date().getDate() - 2))"
            lang="es"
            :preset-dates="presetDates"
            :favouriteMonthsProp="favouriteMonths" />
        -->
    </div>
</template>

<script lang="ts">
import Calendar from './components/Calendar.vue';

export default {
    components: {
        Calendar
    },
    data() {
        return {
            presetDates: {
                from: { order: 0, date: 15 },
                to: { order: 0, date: 21 }
            },
            callendarBegins: new Date(new Date().setDate(new Date().getDate() - 2)),
        };
    },
    computed: {
        favouriteMonths() {
            const currentDate = new Date();

            return [
                {
                    label: "Last minute",
                    fromMonth: currentDate.getMonth(),
                    toMonth: currentDate.getMonth() + 1,
                    year: currentDate.getFullYear()
                },
                {
                    label: this.$t('months.0') + " / " + this.$t('months.1') + " 2025",
                    fromMonth: 0,
                    toMonth: 1,
                    year: 2025
                },
                {
                    label: this.$t('months.2') + " / " + this.$t('months.3') + " 2026",
                    fromMonth: 2,
                    toMonth: 3,
                    year: 2025
                },
                {
                    label: this.$t('months.4') + " / " + this.$t('months.5') + " 2025",
                    fromMonth: 4,
                    toMonth: 5,
                    year: 2025
                },
                {
                    label: this.$t('labels.summerHolidays'),
                    fromMonth: 7,
                    toMonth: 8,
                    year: 2025
                }
            ];
        }
    }
};
</script>