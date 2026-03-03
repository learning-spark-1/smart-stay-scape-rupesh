import { useState } from "react";
import PageShell from "@/components/PageShell";
import CsvUpload from "@/components/CsvUpload";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, Trash2, Calendar } from "lucide-react";

interface Holiday {
  id: string;
  date: string;
  name: string;
}

const defaultHolidays: Holiday[] = [
  { id: "1", date: "2026-01-26", name: "Republic Day" },
  { id: "2", date: "2026-03-17", name: "Holi" },
  { id: "3", date: "2026-08-15", name: "Independence Day" },
  { id: "4", date: "2026-10-20", name: "Diwali" },
  { id: "5", date: "2026-12-25", name: "Christmas" },
  { id: "6", date: "2026-11-01", name: "Dussehra" },
];

const Holidays = () => {
  const [holidays, setHolidays] = useState<Holiday[]>(defaultHolidays);
  const [newDate, setNewDate] = useState("");
  const [newName, setNewName] = useState("");

  const addHoliday = () => {
    if (!newDate || !newName) return;
    setHolidays((prev) => [...prev, { id: crypto.randomUUID(), date: newDate, name: newName }]);
    setNewDate("");
    setNewName("");
  };

  const removeHoliday = (id: string) => setHolidays((prev) => prev.filter((h) => h.id !== id));

  const handleCsvUpload = (rows: string[][]) => {
    const [, ...data] = rows;
    const imported = data.map((row) => ({ id: crypto.randomUUID(), date: row[0] || "", name: row[1] || "" }));
    setHolidays((prev) => [...prev, ...imported]);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch { return dateStr; }
  };

  const getMonth = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", { month: "short" });
    } catch { return ""; }
  };

  const getDay = (dateStr: string) => {
    try {
      return new Date(dateStr).getDate().toString();
    } catch { return ""; }
  };

  return (
    <PageShell title="Holidays" description="College hostel holiday calendar" icon={<CalendarDays className="h-6 w-6" />} gradient="from-blue-500 to-blue-700">
      {(editMode) => (
        <div className="space-y-6">
          {editMode && (
            <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Date</label>
                  <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Holiday Name</label>
                  <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Republic Day" className="h-11" />
                </div>
                <Button onClick={addHoliday} disabled={!newDate || !newName} className="h-11 gradient-hero border-0 text-primary-foreground">
                  <Plus className="mr-1.5 h-4 w-4" /> Add Holiday
                </Button>
              </CardContent>
            </Card>
          )}

          {editMode && (
            <CsvUpload templateHeaders={["Date", "Name"]} templateFilename="holidays_template.csv" onUpload={handleCsvUpload} />
          )}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {holidays.map((h) => (
              <Card key={h.id} className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="text-[10px] font-bold uppercase leading-none">{getMonth(h.date)}</span>
                    <span className="text-xl font-bold leading-tight">{getDay(h.date)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{h.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(h.date)}</p>
                  </div>
                  {editMode && (
                    <Button variant="ghost" size="icon" className="shrink-0 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeHoliday(h.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Holidays;
