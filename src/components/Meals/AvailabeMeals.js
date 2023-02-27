import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                "https://console.firebase.google.com/project/food-order-app-5e0a1/database/food-order-app-5e0a1-default-rtdb/data/~2F/meals.json"
            );
            const responseData = await response.json();
        };

        const loadedMeals = [];

        for (const key in responseData) {
            loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price,
            });
        }

        fetchMeals();
    }, []);

    const mealsList = DUMMY_MEALS.map((meals) => (
        <MealItem
            key={meals.id}
            id={meals.id}
            name={meals.name}
            description={meals.description}
            price={meals.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
