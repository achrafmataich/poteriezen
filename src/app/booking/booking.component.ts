import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreneauxHoraires } from '../types/creneaux-horraires';

export interface Offer {
  name: string;
  description: string;
  price: number;
  about_the_price?: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required, this.dateValidator]),
    heure: new FormControl('', [Validators.required]),
    offre: new FormControl<Offer | null>(null, [Validators.required]), // Added offer validation
  });

  creneauxHoraires!: CreneauxHoraires[];

  heuresDisponibles: string[] = [];


  offers: Offer[] = [
    {
      name: "Séance individuelle",
      description: "Profitez d'une séance individuelle personnalisée.",
      price: 300
    },
    {
      name: "Séance en groupe",
      description: "Partagez l'expérience avec vos amis ou collègues.",
      price: 170,
      about_the_price: "par personne"
    },
    {
      name: "Séance parent-enfant",
      description: "Partagez ces moments avec vos enfants.",
      price: 160,
      about_the_price: "par individu"
    }
  ];

  selectedOffer: Offer | null = null; // Initialize to null

  constructor(private readonly http: HttpClient) {
    this.reservationForm.get("heure")?.addValidators(this.heureValidator);
  }

  ngOnInit() {
    this.http.get('assets/json/creneaux-horaires.json').subscribe((data: any) => {
      this.creneauxHoraires = data;
    });
  }

  isSelected = (offer: Offer): boolean => {
    return offer === this.selectedOffer;
  }

  selectOffer = (offer: Offer) => {
    this.selectedOffer = offer;
    this.offreControl?.setValue(offer);
  }

  onDateChange() {
    this.heuresDisponibles = this.getHeuresDisponibles(this.reservationForm.get('date')?.value);
    this.selectedOffer = null;
  }

  getHeuresDisponibles(date: string): string[] {
    if (date && date.length > 0) {

      const dateDate: Date = new Date(date);


      const jour = dateDate.getDay();
      const creneaux = this.creneauxHoraires.find(c => this.creneauxHoraires.indexOf(c) === jour - 1);

      if (!creneaux) {
        return [];
      }
      const heures = [];
      const heureDebut = new Date(`1970-01-01 ${creneaux.heureDebut}`);
      const heureFin = new Date(`1970-01-01 ${creneaux.heureFin}`);

      while (heureDebut < heureFin) {
        heures.push(heureDebut.toLocaleTimeString());
        heureDebut.setMinutes(heureDebut.getMinutes() + 60);
      }
      return heures;
    } else {
      return [];
    }
  }

  // validators

  dateValidator(control: AbstractControl<any>): { [key: string]: any } | null {
    const dateStr = control.value;
    const date: Date = new Date(dateStr);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15);
    if (date < minDate || date > maxDate) {
      return { 'dateOutOfRange': true };
    }
    const jour = date.getDay();
    if (jour === 0 || jour === 6) {
      return { 'weekend': true };
    }
    return null;
  }

  heureValidator(control: AbstractControl<any>): { [key: string]: any } | null {
    const heure = control.value; // Get the heure value from the control

    // Access date value with optional chaining and conditional logic:
    const dateValue = this.reservationForm.get('date')?.value;
    if (dateValue) {
      const jour = new Date(dateValue).getDay(); // Create a Date object

      // Find creneaux using findIndex for robustness:
      const creneaux = this.creneauxHoraires.findIndex((c) => this.creneauxHoraires.indexOf(c) === jour);

      // Handle cases where there are no creneaux for the selected date:
      if (creneaux === -1) {
        return { 'jourNonDisponible': true }; // Indicate unavailable day
      }

      const heureDebut = new Date(`1970-01-01 ${this.creneauxHoraires[creneaux].heureDebut}`);
      const heureFin = new Date(`1970-01-01 ${this.creneauxHoraires[creneaux].heureFin}`);

      const minHeure = heureDebut.getTime();
      const maxHeure = heureFin.getTime() - 3600000; // 1 hour before the end

      const heureChoisie = new Date(heure).getTime();

      // Validate heure based on creneaux timings:
      if (heureChoisie < minHeure || heureChoisie > maxHeure) {
        return { 'heureOutOfRange': true };
      }
    }

    return null; // Validation passes if date & heure are valid
  }

  get dateControl() {
    return this.reservationForm.get('date');
  }

  get heureControl() {
    return this.reservationForm.get('heure');
  }

  get offreControl() {
    return this.reservationForm.get('offre');
  }

  submitForm() {
    // Handle form submission logic here
    // Access form values with this.reservationForm.value
  }
}
