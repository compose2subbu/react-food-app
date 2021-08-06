import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from 'react';

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
//https://react-web-643bc-default-rtdb.asia-southeast1.firebasedatabase.app/meals
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
    const fetchMeals = async () => {
      setisLoading(true);
      const response = await fetch('https://react-web-643bc-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json').then();
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadedmeals = [];
      for(const key in responseData){
        loadedmeals.push({
          id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedmeals);
      setisLoading(false);
    }
      fetchMeals().catch(error => {
        setHttpError(error.message);
        setisLoading(false);
      });
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if(isLoading){
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
