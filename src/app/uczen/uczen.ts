// ============================================================
// INTERFACE – opis "kształtu" obiektu
// ------------------------------------------------------------
// Interface istnieje tylko w TypeScript (po kompilacji znika).
// Mówi: "każdy obiekt typu Uczen MUSI mieć te pola i te typy".
// Dzięki temu edytor podpowiada pola, a błąd literówki
// (np. u.imei zamiast u.imie) wychodzi już przy kompilacji.
//
// Porównanie do C#: to trochę jak klasa-model (DTO) z samymi właściwościami.
// ============================================================
export interface Uczen {
  id: number;             // unikalny identyfikator – używamy go w "track"
  imie: string;
  nazwisko: string;
  klasa: string;
  srednia: number;
  obecnosc: number;       // frekwencja w procentach (0–100)
  aktywny: boolean;
  dataUrodzenia: Date;    // do pokazania pipe'a "date"
}
