import { useState } from "react";
import PageShell from "@/components/PageShell";
import CsvUpload from "@/components/CsvUpload";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShowerHead, Plus, Trash2, Droplets, UtensilsCrossed, MapPin, CheckCircle2, AlertTriangle } from "lucide-react";

interface Amenity {
  id: string;
  category: string;
  name: string;
  location: string;
  status: string;
}

const defaultAmenities: Amenity[] = [
  { id: "1", category: "Washroom", name: "Washroom A", location: "Ground Floor, Block A", status: "Functional" },
  { id: "2", category: "Washroom", name: "Washroom B", location: "First Floor, Block A", status: "Under Maintenance" },
  { id: "3", category: "Washroom", name: "Washroom C", location: "Second Floor, Block B", status: "Functional" },
  { id: "4", category: "Drinking Water", name: "RO Unit 1", location: "Ground Floor Lobby", status: "Functional" },
  { id: "5", category: "Drinking Water", name: "RO Unit 2", location: "Second Floor Corridor", status: "Functional" },
  { id: "6", category: "Drinking Water", name: "Water Cooler", location: "First Floor", status: "Under Maintenance" },
  { id: "7", category: "Mess", name: "Main Mess Hall", location: "Ground Floor, Central Block", status: "Functional" },
  { id: "8", category: "Mess", name: "Mini Canteen", location: "Near Gate", status: "Functional" },
];

const categoryConfig: Record<string, { icon: React.ReactNode; gradient: string; bg: string }> = {
  washroom: { icon: <ShowerHead className="h-6 w-6" />, gradient: "from-violet-500 to-violet-600", bg: "bg-violet-50 text-violet-700" },
  "drinking water": { icon: <Droplets className="h-6 w-6" />, gradient: "from-cyan-500 to-cyan-600", bg: "bg-cyan-50 text-cyan-700" },
  mess: { icon: <UtensilsCrossed className="h-6 w-6" />, gradient: "from-rose-500 to-rose-600", bg: "bg-rose-50 text-rose-700" },
};

const getConfig = (cat: string) => categoryConfig[cat.toLowerCase()] || categoryConfig.washroom;

const Amenities = () => {
  const [amenities, setAmenities] = useState<Amenity[]>(defaultAmenities);
  const [newCat, setNewCat] = useState("");
  const [newName, setNewName] = useState("");
  const [newLoc, setNewLoc] = useState("");
  const [newStatus, setNewStatus] = useState("Functional");

  const addAmenity = () => {
    if (!newCat || !newName) return;
    setAmenities((prev) => [...prev, { id: crypto.randomUUID(), category: newCat, name: newName, location: newLoc, status: newStatus }]);
    setNewCat(""); setNewName(""); setNewLoc(""); setNewStatus("Functional");
  };

  const removeAmenity = (id: string) => setAmenities((prev) => prev.filter((a) => a.id !== id));

  const handleCsvUpload = (rows: string[][]) => {
    const [, ...data] = rows;
    const imported = data.map((row) => ({ id: crypto.randomUUID(), category: row[0] || "", name: row[1] || "", location: row[2] || "", status: row[3] || "Functional" }));
    setAmenities((prev) => [...prev, ...imported]);
  };

  const grouped = amenities.reduce<Record<string, Amenity[]>>((acc, a) => {
    (acc[a.category] = acc[a.category] || []).push(a);
    return acc;
  }, {});

  return (
    <PageShell title="Amenities" description="Washrooms, drinking water, and mess facilities" icon={<ShowerHead className="h-6 w-6" />} gradient="from-violet-500 to-violet-700">
      {(editMode) => (
        <div className="space-y-6">
          {editMode && (
            <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Category</label>
                  <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Washroom / Drinking Water / Mess" className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Name</label>
                  <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Washroom A" className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Location</label>
                  <Input value={newLoc} onChange={(e) => setNewLoc(e.target.value)} placeholder="Ground Floor" className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Status</label>
                  <Input value={newStatus} onChange={(e) => setNewStatus(e.target.value)} placeholder="Functional" className="h-11" />
                </div>
                <Button onClick={addAmenity} disabled={!newCat || !newName} className="h-11 gradient-hero border-0 text-primary-foreground">
                  <Plus className="mr-1.5 h-4 w-4" /> Add
                </Button>
              </CardContent>
            </Card>
          )}

          {editMode && (
            <CsvUpload templateHeaders={["Category", "Name", "Location", "Status"]} templateFilename="amenities_template.csv" onUpload={handleCsvUpload} />
          )}

          <div className="space-y-8">
            {Object.entries(grouped).map(([category, items]) => {
              const config = getConfig(category);
              return (
                <div key={category}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} text-primary-foreground`}>
                      {config.icon}
                    </div>
                    <h2 className="font-display text-xl font-bold">{category}</h2>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{items.length}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {items.map((a) => (
                      <Card key={a.id} className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                        <CardContent className="flex items-center gap-4 p-5">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                            {config.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold">{a.name}</p>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <MapPin className="h-3 w-3" />
                              {a.location}
                            </p>
                            <div className="mt-1.5 flex items-center gap-1 text-xs font-medium">
                              {a.status === "Functional" ? (
                                <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Functional</span>
                              ) : (
                                <span className="flex items-center gap-1 text-amber-600"><AlertTriangle className="h-3 w-3" /> {a.status}</span>
                              )}
                            </div>
                          </div>
                          {editMode && (
                            <Button variant="ghost" size="icon" className="shrink-0 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeAmenity(a.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Amenities;
