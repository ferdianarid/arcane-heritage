import { FoodListDashboard } from "@/components/dashboard/food-list";
import { getAllFoods } from "@/servers/actions/foods/actions";

export default async function DashboardMakanan() {
  const foods = await getAllFoods();
  console.log(foods);
  return (
    <>
      <FoodListDashboard foods={foods} />
    </>
  );
}
