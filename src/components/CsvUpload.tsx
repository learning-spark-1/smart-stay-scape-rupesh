import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface CsvUploadProps {
  templateHeaders: string[];
  templateFilename: string;
  onUpload: (data: string[][]) => void;
}

const CsvUpload = ({ templateHeaders, templateFilename, onUpload }: CsvUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = () => {
    const csvContent = templateHeaders.join(",") + "\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = templateFilename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Template downloaded!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.trim().split("\n").map((row) => row.split(",").map((cell) => cell.trim()));
      onUpload(rows);
      toast.success(`Imported ${rows.length - 1} rows from CSV`);
    };
    reader.readAsText(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-dashed bg-muted/30 p-4">
      <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
      <span className="mr-auto text-sm text-muted-foreground">Import data via CSV</span>
      <Button variant="outline" size="sm" onClick={handleDownloadTemplate} className="gap-1.5">
        <Download className="h-3.5 w-3.5" />
        Download Template
      </Button>
      <Button size="sm" onClick={() => inputRef.current?.click()} className="gap-1.5 gradient-hero border-0 text-primary-foreground">
        <Upload className="h-3.5 w-3.5" />
        Import CSV
      </Button>
      <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default CsvUpload;
