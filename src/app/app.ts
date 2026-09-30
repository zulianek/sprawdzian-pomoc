// ============================================================
// KOMPONENT GŁÓWNY (RODZIC)
// Klasa = dane + logika. Szablon (app.component.html) = wygląd.
// Wszystko co jest publicznym polem/metodą klasy, można użyć w szablonie.
// ============================================================
import { Component } from '@angular/core';
// Dyrektywy i pipe'y z @angular/common – w standalone importujemy je pojedynczo
import {
  NgClass, NgStyle,
  DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe,
  DecimalPipe, PercentPipe, SlicePipe, JsonPipe
} from '@angular/common';
import { Uczen } from './uczen/uczen.ts';
import { UczenKartaComponent } from './uczen-karta/uczen-karta.component';

// Dane startowe trzymamy POZA klasą, żeby przycisk "Przywróć" mógł zrobić z nich kopię.
// Tablica obiektów typu Uczen[] – kompilator pilnuje, żeby każdy obiekt miał wszystkie pola interfejsu.
const DANE_POCZATKOWE: Uczen[] = [
  { id: 1, imie: 'Anna',     nazwisko: 'Kowalska',     klasa: '3TI', srednia: 4.8, obecnosc: 96, aktywny: true,  dataUrodzenia: new Date('2007-03-14') },
  { id: 2, imie: 'Piotr',    nazwisko: 'Nowak',        klasa: '3TI', srednia: 3.5, obecnosc: 88, aktywny: true,  dataUrodzenia: new Date('2007-07-02') },
  { id: 3, imie: 'Karolina', nazwisko: 'Wiśniewska',   klasa: '2TI', srednia: 5.0, obecnosc: 99, aktywny: true,  dataUrodzenia: new Date('2008-11-23') },
  { id: 4, imie: 'Marek',    nazwisko: 'Zieliński',    klasa: '2TI', srednia: 1.8, obecnosc: 62, aktywny: false, dataUrodzenia: new Date('2008-01-30') },
  { id: 5, imie: 'Kacper',   nazwisko: 'Lewandowski',  klasa: '3TI', srednia: 2.9, obecnosc: 74, aktywny: true,  dataUrodzenia: new Date('2007-09-09') }
];

@Component({
  selector: 'app-root',
  standalone: true,
  // Wszystko czego używamy w szablonie musi być tutaj (poza @if, @for – te działają bez importu)
  imports: [
    NgClass, NgStyle,
    DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe,
    DecimalPipe, PercentPipe, SlicePipe, JsonPipe,
    UczenKartaComponent            // nasz komponent-dziecko, żeby działał <app-uczen-karta>
  ],
  templateUrl: './app.component.html'
})
export class App {

  // ---------- Zwykłe zmienne (do interpolacji {{ }}) ----------
  tytul: string = 'Angular + Bootstrap – ściąga na sprawdzian';
  licznik: number = 0;

  // ---------- Zmienne do property bindingu [ ] ----------
  kolorTla: string = '#e7f1ff';
  rozmiarCzcionki: number = 18;   // liczba – jednostkę "px" dodamy w szablonie

  // ---------- Zmienne do @if ----------
  czyZalogowany: boolean = true;
  punkty: number = 72;

  // ---------- Zmienne do pipe'ów ----------
  tytulFilmu: string = 'avengers: endgame';
  cena: number = 1234.5;
  ulamek: number = 0.256;
  dzis: Date = new Date();
  opis: string = 'Bardzo długi opis, który chcemy skrócić do kilkunastu znaków.';

  // ---------- Dane (tablice obiektów) ----------
  // Kopia tablicy ([...tablica]), żeby usuwanie nie ruszało DANE_POCZATKOWE
  uczniowie: Uczen[] = [...DANE_POCZATKOWE];
  ulubieni: Uczen[] = [];

  // Puste tablice do pokazania bloku @empty
  pustaLista: string[] = [];

  // Wynik metody wywołanej z przekazaniem zmiennej szablonowej
  powitanie: string = '';

  // ============================================================
  // METODY (wywoływane z szablonu przez (click) itd.)
  // ============================================================

  zwieksz(): void { this.licznik++; }
  zmniejsz(): void { this.licznik--; }

  przelaczLogin(): void {
    this.czyZalogowany = !this.czyZalogowany;   // odwracamy boolean
  }

  // Dostaje string, bo w szablonie przekażemy imieRef.value (zmienna szablonowa)
  przywitaj(imie: string): void {
    this.powitanie = `Cześć, ${imie}! Witaj w Angularze!`;   // template string (backticki)
  }

  // Dodawanie do tablicy obiektów. Argumenty to stringi, bo .value z inputa zawsze jest stringiem.
  dodajUcznia(imie: string, nazwisko: string, srednia: string): void {
    if (!imie.trim() || !nazwisko.trim()) return;    // prosta walidacja – puste pola ignorujemy

    const nowyId = Math.max(0, ...this.uczniowie.map(u => u.id)) + 1;

    const nowy: Uczen = {
      id: nowyId,
      imie: imie.trim(),
      nazwisko: nazwisko.trim(),
      klasa: '1TI',
      srednia: Number(srednia) || 0,   // Number("abc") = NaN -> NaN jest falsy -> podstawiamy 0
      obecnosc: 100,
      aktywny: true,
      dataUrodzenia: new Date()
    };

    this.uczniowie.push(nowy);
  }

  // Zwraca obiekt dla [ngClass]: klucz = klasa CSS, wartość = warunek
  klasaSredniej(srednia: number): object {
    return {
      'bg-success': srednia >= 4.5,
      'bg-primary': srednia >= 3.5 && srednia < 4.5,
      'bg-warning': srednia >= 2.0 && srednia < 3.5,
      'bg-danger': srednia < 2.0
    };
  }

  // ---------- Obsługa zdarzeń z komponentu-dziecka ----------
  // $event w szablonie = dane, które dziecko wysłało przez emit()

  onPolub(uczen: Uczen): void {
    // dodajemy do ulubionych tylko jeśli jeszcze go tam nie ma
    if (!this.ulubieni.find(u => u.id === uczen.id)) {
      this.ulubieni.push(uczen);
    }
  }

  onUsun(id: number): void {
    // filter zwraca NOWĄ tablicę bez elementu o danym id
    this.uczniowie = this.uczniowie.filter(u => u.id !== id);
    this.ulubieni = this.ulubieni.filter(u => u.id !== id);
  }

  przywroc(): void {
    this.uczniowie = [...DANE_POCZATKOWE];
    this.ulubieni = [];
  }
}
