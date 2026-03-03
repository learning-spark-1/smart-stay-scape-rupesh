import { useState } from "react";
import PageShell from "@/components/PageShell";
import CsvUpload from "@/components/CsvUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Plus, Trash2, Coffee, Sun, Moon } from "lucide-react";

interface MenuItem {
  id: string;
  day: string;
  meal: string;
  items: string;
}

const defaultMenu: MenuItem[] = [
  { id: "1", day: "Monday", meal: "Breakfast", items: "Poha, Tea, Banana" },
  { id: "2", day: "Monday", meal: "Lunch", items: "Dal, Rice, Roti, Salad" },
  { id: "3", day: "Monday", meal: "Dinner", items: "Paneer, Rice, Roti, Sweet" },
  { id: "4", day: "Tuesday", meal: "Breakfast", items: "Idli, Sambhar, Coffee" },
  { id: "5", day: "Tuesday", meal: "Lunch", items: "Rajma, Rice, Roti, Raita" },
  { id: "6", day: "Tuesday", meal: "Dinner", items: "Chole, Rice, Roti, Pickle" },
  { id: "7", day: "Wednesday", meal: "Breakfast", items: "Paratha, Curd, Juice" },
  { id: "8", day: "Wednesday", meal: "Lunch", items: "Kadhi, Rice, Roti, Papad" },
];

const mealIcon = (meal: string) => {
  switch (meal.toLowerCase()) {
    case "breakfast": return <Coffee className="h-3.5 w-3.5" />;
    case "lunch": return <Sun className="h-3.5 w-3.5" />;
    case "dinner": return <Moon className="h-3.5 w-3.5" />;
    default: return <UtensilsCrossed className="h-3.5 w-3.5" />;
  }
};

const mealColor = (meal: string) => {
  switch (meal.toLowerCase()) {
    case "breakfast": return "bg-amber-100 text-amber-700 border-amber-200";
    case "lunch": return "bg-orange-100 text-orange-700 border-orange-200";
    case "dinner": return "bg-indigo-100 text-indigo-700 border-indigo-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const Menu = () => {
  const [menu, setMenu] = useState<MenuItem[]>(defaultMenu);
  const [newDay, setNewDay] = useState("");
  const [newMeal, setNewMeal] = useState("");
  const [newItems, setNewItems] = useState("");

  const addItem = () => {
    if (!newDay || !newMeal || !newItems) return;
    setMenu((prev) => [...prev, { id: crypto.randomUUID(), day: newDay, meal: newMeal, items: newItems }]);
    setNewDay(""); setNewMeal(""); setNewItems("");
  };

  const removeItem = (id: string) => setMenu((prev) => prev.filter((m) => m.id !== id));

  const handleCsvUpload = (rows: string[][]) => {
    const [, ...data] = rows;
    const imported = data.map((row) => ({ id: crypto.randomUUID(), day: row[0] || "", meal: row[1] || "", items: row[2] || "" }));
    setMenu((prev) => [...prev, ...imported]);
  };

  const grouped = menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.day] = acc[item.day] || []).push(item);
    return acc;
  }, {});

  return (
    <PageShell title="Mess Menu" description="Weekly meal schedule for hostel residents" icon={<UtensilsCrossed className="h-6 w-6" />} gradient="from-orange-500 to-orange-700">
      {(editMode) => (
        <div className="space-y-6">
          {editMode && (
            <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Day</label>
                  <Input value={newDay} onChange={(e) => setNewDay(e.target.value)} placeholder="e.g. Monday" className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Meal</label>
                  <Input value={newMeal} onChange={(e) => setNewMeal(e.target.value)} placeholder="Breakfast / Lunch / Dinner" className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Items</label>
                  <Input value={newItems} onChange={(e) => setNewItems(e.target.value)} placeholder="Dal, Rice, Roti" className="h-11" />
                </div>
                <Button onClick={addItem} disabled={!newDay || !newMeal || !newItems} className="h-11 gradient-hero border-0 text-primary-foreground">
                  <Plus className="mr-1.5 h-4 w-4" /> Add
                </Button>
              </CardContent>
            </Card>
          )}

          {editMode && (
            <CsvUpload templateHeaders={["Day", "Meal", "Items"]} templateFilename="menu_template.csv" onUpload={handleCsvUpload} />
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(grouped).map(([day, items]) => (
              <Card key={day} className="overflow-hidden transition-all hover:shadow-card-hover">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-3">
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-2">
                  {items.map((item) => (
                    <div key={item.id} className="group flex items-start gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30">
                      <div className={`mt-0.5 flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold ${mealColor(item.meal)}`}>
                        {mealIcon(item.meal)}
                        {item.meal}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed">{item.items}</p>
                      {editMode && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-destructive opacity-0 group-hover:opacity-100" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Menu;
