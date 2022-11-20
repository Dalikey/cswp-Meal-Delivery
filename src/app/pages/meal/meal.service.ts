import {Injectable} from '@angular/core';
import {Meal} from './meal.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  meals: Meal[] = [
    {
      id: '12345-123-12',
      name: 'Pasta Bolognese met tomaat, spekjes en kaas',
      price: 9.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
    {
      id: '12345-123-23',
      name: 'Aubergine uit de oven met feta, muntrijst en tomatensaus',
      price: 8.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
    {
      id: '12345-123-56',
      name: 'Spaghetti met tapenadekip uit de oven en frisse salade',
      price: 9.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
    {
      id: '12345-123-13',
      name: 'Heerlijke zuurkoolschotel, dé winterkost bij uitstek.',
      price: 3.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
    {
      id: '12345-123-14',
      name: 'Mooie zomerse salade met veel groente',
      price: 6.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
    {
      id: '12345-123-15',
      name: 'Hamburger met friet',
      price: 5.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
    {
      id: '12345-123-16',
      name: 'Kipburger met friet',
      price: 5.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
    {
      id: '12345-123-17',
      name: 'Twee unox broodjes',
      price: 3.00,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
    },
  ];

  constructor() {
    console.log('MealService created');
  }

  getAllMeals(): Meal[] {
    return this.meals;
  }

  getMealById(id: string): Meal {
    return this.meals.filter((meal: Meal) => meal.id === id)[0];
  }

  addMeal(newMeal: Meal): void {
    this.meals.push(newMeal);
  }

  updateMeal(updatedMeal: Meal) {
    console.log('Updating meal ' + updatedMeal.name);

    let updatedMeals = this.meals.filter((meal) => meal.id !== updatedMeal.id);
    updatedMeals.push(updatedMeal);
    this.meals = updatedMeals;

    console.log(this.meals);
  }

  deleteMeal(id: string) {
    let meal = this.meals.find((meal) => meal.id == id);
    let index = this.meals.indexOf(meal!);
    this.meals.splice(index, 1);
  }
}
