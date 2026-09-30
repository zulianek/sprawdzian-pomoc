// ============================================================
// KOMPONENT POTOMNY (DZIECKO)
// Pokazuje jednego ucznia. Dane dostaje od rodzica przez @Input,
// a o kliknięciach informuje rodzica przez @Output.
//
//   RODZIC  --[uczen]="u"-->  DZIECKO      (@Input  – dane w dół)
//   RODZIC  <--(polubiony)--  DZIECKO      (@Output – zdarzenia w górę)
// ============================================================
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Uczen } from './uczen';

@Component({
  selector: 'app-uczen-karta',            // tak wstawiamy komponent w HTML: <app-uczen-karta>
  standalone: true,                        // od Angulara 19 to domyślne, ale można zapisać jawnie
  imports: [NgClass],                      // standalone = wszystko czego używamy w szablonie importujemy tu
  templateUrl: '../uczen/uczen-karta.component.html'
})
export class UczenKartaComponent {

  // @Input – wartość przychodzi OD RODZICA.
  // "!" = obiecujemy kompilatorowi, że rodzic na pewno to przekaże.
  @Input() uczen!: Uczen;

  // @Input z wartością domyślną (gdy rodzic nic nie poda)
  @Input() numer: number = 0;

  // @Output + EventEmitter – "nadajnik" zdarzeń do rodzica.
  // <Uczen> / <number> to typ danych, który wysyłamy.
  @Output() polubiony = new EventEmitter<Uczen>();
  @Output() usuniety = new EventEmitter<number>();

  polub(): void {
    // emit() wysyła dane do rodzica – tam trafią do $event
    this.polubiony.emit(this.uczen);
  }

  usun(): void {
    // wysyłamy samo id, rodzicowi wystarczy żeby usunąć z tablicy
    this.usuniety.emit(this.uczen.id);
  }

  // Metoda zwracająca obiekt klas dla [ngClass]:
  // klucz = nazwa klasy CSS, wartość = warunek (true -> klasa dodana)
  klasaSredniej(): object {
    return {
      'bg-success': this.uczen.srednia >= 4.5,
      'bg-primary': this.uczen.srednia >= 3.5 && this.uczen.srednia < 4.5,
      'bg-warning': this.uczen.srednia >= 2.0 && this.uczen.srednia < 3.5,
      'bg-danger': this.uczen.srednia < 2.0
    };
  }
}
