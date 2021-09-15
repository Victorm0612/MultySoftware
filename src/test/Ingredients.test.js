import { addToList } from "../helper/addItemToList";
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Testing array to add or increase/decrease the amount of ingredients", () => {
  // Ingredients Component
  const ALL_INGREDIENTS = [
    { ingredient_name: "Pollo", id: 1 },
    { ingredient_name: "Pimienta", id: 2 },
  ];
  let ingredients = [];

  test("Add element in empty array", () => {
    let newIngredient = { ingredient_name: "Pollo", amount: 1 };
    addToList(newIngredient, ingredients, ALL_INGREDIENTS, (newArr) => {
      ingredients = newArr;
    });
    expect(ingredients).toHaveLength(1);
    expect(ingredients[0].amount).toEqual(1);
  });

  test("Add element in array with a different ingredient", () => {
    let newIngredient = { ingredient_name: "Pimienta", amount: 4 };
    addToList(newIngredient, ingredients, ALL_INGREDIENTS, (newArr) => {
      ingredients = newArr;
    });
    expect(ingredients).toHaveLength(2);
    expect(ingredients[1].amount).toEqual(4);
  });

  test("Add element in array with the same ingredient and increment amount", () => {
    let newIngredient = { ingredient_name: "Pimienta", amount: 4 };
    addToList(newIngredient, ingredients, ALL_INGREDIENTS, (newArr) => {
      ingredients = newArr;
    });
    expect(ingredients).toHaveLength(2);
    expect(ingredients[1].amount).toEqual(8);
  });

  test("Add element in array with the same ingredient and decrease amount", () => {
    let newIngredient = { ingredient_name: "Pimienta", amount: -4 };
    addToList(newIngredient, ingredients, ALL_INGREDIENTS, (newArr) => {
      ingredients = newArr;
    });
    expect(ingredients).toHaveLength(2);
    expect(ingredients[1].amount).toEqual(4);
  });
});
