
# Kalendářová komponenta

Tento projekt představuje Vue.js komponentu pro výběr a zobrazení kalendáře. Komponenta umožňuje interaktivní výběr data s možností nastavit počáteční a konečné datum, výběr jazyků a přidání oblíbených měsíců. Projekt je součástí úkolu pro demonstraci dovedností ve Vue.js.

## Funkce

- **Výběr dat**: Uživatelé mohou vybírat data mezi dvěma měsíci a zobrazit je na kalendáři.
- **Jazyky**: Podporuje různé jazyky (čeština, slovenština, angličtina, němčina, polština, ukrajinština, španělština).
- **Oblíbené měsíce**: Uživatelé mohou mít definované oblíbené měsíce pro rychlý výběr.
- **Omezení počtu dnů**: Možnost nastavit maximální počet dní pro rezervaci.
- **Dynamické zobrazení**: Automatické přizpůsobení měsíce a roku v závislosti na výběru.

## Instalace

Pro instalaci a spuštění projektu potřebujete mít nainstalován Node.js a npm. Následujte tyto kroky:

1. Klonujte repozitář:
   ```bash
   git clone https://github.com/vaše-uživatelské-jméno/kalendář-komponenta.git
   ```

2. Nainstalujte závislosti:
   ```bash
   cd kalendář-komponenta
   npm install
   ```

3. Spusťte vývojový server:
   ```bash
   npm run dev
   ```

4. Otevřete aplikaci v prohlížeči na adrese `http://localhost:3000`.

## Použití

Komponenta kalendáře se používá jako Vue komponenta. Můžete ji přidat do vašeho projektu následovně:

1. Importujte komponentu:
   ```javascript
   import Calendar from './path/to/Calendar.vue';
   ```

2. Použijte ji v šabloně:
   ```vue
   <Calendar
     :maximumBookingDays="30"
     :calendarBegins="new Date()"
     :lang="'cs'"
     :presetDates="{ from: { date: 10, month: 0, year: 2025 }, to: { date: 15, month: 0, year: 2025 } }"
     :favouriteMonthsProp="favouriteMonths" />
   ```

## Konfigurace

### Props

- `maximumBookingDays`: Maximální počet dní pro výběr (výchozí: 30).
- `calendarBegins`: Počáteční datum kalendáře (výchozí: dnešní datum).
- `lang`: Jazyk aplikace (výchozí: `'cs'`).
- `presetDates`: Objekty s přednastavenými daty pro výběr.
- `favouriteMonthsProp`: Pole oblíbených měsíců pro rychlý výběr.

### Metody

- `setLanguage(lang)`: Nastaví jazyk kalendáře.
- `handleDateSelected(date)`: Zpracuje výběr data.
- `handleMouseOver(date)`: Zpracuje přejetí myší nad datem.

## Příklady

### Výběr oblíbených měsíců:
Tato komponenta umožňuje definovat oblíbené měsíce, které uživatel může rychle vybrat.

```javascript
favouriteMonthsProp: [
  { label: 'Poslední minutová nabídka', fromMonth: 0, toMonth: 1, year: 2025 },
  { label: 'Léto 2025', fromMonth: 6, toMonth: 8, year: 2025 }
]
```

### Změna jazyka:
Uživatel může změnit jazyk pomocí tlačítka pro jazykovou volbu.

## Licence

Tento projekt je licencován pod licencí MIT - viz [LICENSE](LICENSE) soubor pro detaily.
# calendar
