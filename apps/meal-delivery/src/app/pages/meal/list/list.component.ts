import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  meals: Meal[] = [
    {
      id: '12345-123-12',
      name: 'Pasta Bolognese met tomaat, spekjes en kaas',
      price: 9.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-23',
      name: 'Aubergine uit de oven met feta, muntrijst en tomatensaus',
      price: 8.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-56',
      name: 'Spaghetti met tapenadekip uit de oven en frisse salade',
      price: 9.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-13',
      name: 'Heerlijke zuurkoolschotel, dé winterkost bij uitstek.',
      price: 3.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-14',
      name: 'Mooie zomerse salade met veel groente',
      price: 6.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-15',
      name: 'Hamburger met friet',
      price: 5.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-16',
      name: 'Kipburger met friet',
      price: 5.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-17',
      name: 'Twee unox broodjes',
      price: 3.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
  ];

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.mealService.getAllMeals().subscribe((meals: any) => {
      this.meals = meals.results;
    });
  }

  ngOnDestroy(): void {}

  deleteMeal(id: string) {
    let meal = this.meals.find((meal) => meal.id == id);
    let index = this.meals.indexOf(meal!);
    this.meals.splice(index, 1);
  }

  toDecimal(price: number | undefined) {
    return price?.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  }
}
