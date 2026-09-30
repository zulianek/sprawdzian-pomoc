import { Component } from '@angular/core';

// Interfejs do opisu obiektu
export interface Uczen {
  id: number;
  imie: string;
  nazwisko: string;
  klasa: string;
  srednia: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [], // Żadne moduły czy pipe'y nie są potrzebne!
  templateUrl: './app.html'
})
export class App {
  // Zmienne
  tytul: string = 'Angular - Prosta ściąga na sprawdzian';
  licznik: number = 0;
  czyZalogowany: boolean = true;
  punkty: number = 75;
  powitanie: string = '';

  // Tablica z danymi
  uczniowie: Uczen[] = [
    { id: 1, imie: 'Anna', nazwisko: 'Kowalska', klasa: '3TI', srednia: 4.8 },
    { id: 2, imie: 'Piotr', nazwisko: 'Nowak', klasa: '3TI', srednia: 3.5 },
    { id: 3, imie: 'Marek', nazwisko: 'Zieliński', klasa: '2TI', srednia: 1.8 }
  ];

  // Metody do obsługi akcji w szablonie
  zwieksz(): void {
    this.licznik++;
  }

  zmniejsz(): void {
    this.licznik--;
  }

  przelaczLogin(): void {
    this.czyZalogowany = !this.czyZalogowany;
  }

  przywitaj(imie: string): void {
    if (imie.trim()) {
      this.powitanie = `Witaj ${imie}!`;
    }
  }

  usunUcznia(id: number): void {
    this.uczniowie = this.uczniowie.filter(u => u.id !== id);
  }

  dodajUcznia(imie: string, nazwisko: string, srednia: string): void {
    if (!imie || !nazwisko) return;

    const nowy: Uczen = {
      id: Date.now(), // generowanie unikalnego ID z czasu
      imie: imie,
      nazwisko: nazwisko,
      klasa: '1TI',
      srednia: Number(srednia) || 0
    };

    this.uczniowie.push(nowy);
  }
}
