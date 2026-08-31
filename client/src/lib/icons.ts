import {
  ShoppingBasket, SaladIcon, Car, ShoppingBag, Gamepad2,
  HeartPlus, DollarSign, CardSim, Plane, Coffee, Fuel,
  Home, Lightbulb, School, Dumbbell, Gift,
  type LucideIcon,
  Wallet,
} from "lucide-react";


export const categoryIcons: Record<string, LucideIcon> = {
  groceries: ShoppingBasket,
  dining: SaladIcon,
  transport: Car,
  shopping: ShoppingBag,
  entertainment: Gamepad2,
  health: HeartPlus,
  bills: DollarSign,
  salary: DollarSign,
  subscription: CardSim,
  travel: Plane,
  coffee: Coffee,
  fuel: Fuel,
  rent: Home,
  utilities: Lightbulb,
  education: School,
  fitness: Dumbbell,
  gifts: Gift,
};


export const getCategoryIcon = (name: string): LucideIcon =>
  categoryIcons[name] ?? Wallet;