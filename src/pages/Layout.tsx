import { useState } from "react";
import PageShell from "@/components/PageShell";
import CsvUpload from "@/components/CsvUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Plus, Trash2, DoorOpen, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Room {
  id: string;
  floor: string;
  roomNumber: string;
  capacity: string;
  status: string;
}

const defaultRooms: Room[] = [
  { id: "1", floor: "Ground Floor", roomNumber: "G-01", capacity: "3", status: "Occupied" },
  { id: "2", floor: "Ground Floor", roomNumber: "G-02", capacity: "2", status: "Available" },
  { id: "3", floor: "Ground Floor", roomNumber: "G-03", capacity: "4", status: "Occupied" },
  { id: "4", floor: "First Floor", roomNumber: "1-01", capacity: "3", status: "Occupied" },
  { id: "5", floor: "First Floor", roomNumber: "1-02", capacity: "4", status: "Available" },
  { id: "6", floor: "First Floor", roomNumber: "1-03", capacity: "2", status: "Available" },
  { id: "7", floor: "Second Floor", roomNumber: "2-01", capacity: "2", status: "Maintenance" },
  { id: "8", floor: "Second Floor", roomNumber: "2-02", capacity: "3", status: "Occupied" },
];

const statusConfig: Record<string, { class: string; dot: string }> = {
  available: { class: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  occupied: { class: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  maintenance: { class: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
};

const getStatus = (s: string) => statusConfig[s.toLowerCase()] || statusConfig.maintenance;

const LayoutPage = () => {
  const [rooms, setRooms] = useState<Room[]>(defaultRooms);
  const [newFloor, setNewFloor] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newCap, setNewCap] = useState("");
  const [newStatus, setNewStatus] = useState("Available");

  const addRoom = () => {
    if (!newFloor || !newRoom) return;
    setRooms((prev) => [...prev, { id: crypto.randomUUID(), floor: newFloor, roomNumber: newRoom, capacity: newCap, status: newStatus }]);
    setNewFloor(""); setNewRoom(""); setNewCap(""); setNewStatus("Available");
  };

  const removeRoom = (id: string) => setRooms((prev) => prev.filter((r) => r.id !== id));

  const handleCsvUpload = (rows: string[][]) => {
    const [, ...data] = rows;
    const imported = data.map((row) => ({ id: crypto.randomUUID(), floor: row[0] || "", roomNumber: row[1] || "", capacity: row[2] || "", status: row[3] || "Available" }));
    setRooms((prev) => [...prev, ...imported]);
  };

  const grouped = rooms.reduce<Record<string, Room[]>>((acc, room) => {
    (acc[room.floor] = acc[room.floor] || []).push(room);
    return acc;
  }, {});

  return (
    <PageShell title="Room Layout" description="Floor plans and room allocation details" icon={<LayoutGrid className="h-6 w-6" />} gradient="from-emerald-500 to-emerald-700">
      {(editMode) => (
        <div className="space-y-6">
          {editMode && (
            <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Floor</label>
                  <Input value={newFloor} onChange={(e) => setNewFloor(e.target.value)} placeholder="e.g. Ground Floor" className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Room No.</label>
                  <Input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} placeholder="G-01" className="h-11" />
                </div>
                <div className="w-28 space-y-1.5">
                  <label className="text-sm font-semibold">Capacity</label>
                  <Input value={newCap} onChange={(e) => setNewCap(e.target.value)} placeholder="3" className="h-11" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-semibold">Status</label>
                  <Input value={newStatus} onChange={(e) => setNewStatus(e.target.value)} placeholder="Available" className="h-11" />
                </div>
                <Button onClick={addRoom} disabled={!newFloor || !newRoom} className="h-11 gradient-hero border-0 text-primary-foreground">
                  <Plus className="mr-1.5 h-4 w-4" /> Add
                </Button>
              </CardContent>
            </Card>
          )}

          {editMode && (
            <CsvUpload templateHeaders={["Floor", "RoomNumber", "Capacity", "Status"]} templateFilename="layout_template.csv" onUpload={handleCsvUpload} />
          )}

          <div className="space-y-6">
            {Object.entries(grouped).map(([floor, floorRooms]) => (
              <Card key={floor} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DoorOpen className="h-5 w-5 text-primary" />
                    {floor}
                    <Badge variant="secondary" className="ml-auto text-xs">{floorRooms.length} rooms</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {floorRooms.map((room) => {
                      const status = getStatus(room.status);
                      return (
                        <div key={room.id} className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-card-hover">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-display text-lg font-bold">{room.roomNumber}</p>
                              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                Capacity: {room.capacity}
                              </div>
                            </div>
                            <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${status.class}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                              {room.status}
                            </div>
                          </div>
                          {editMode && (
                            <Button variant="ghost" size="icon" className="absolute right-1 bottom-1 h-7 w-7 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeRoom(room.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default LayoutPage;
