import { useState } from "react";
import EditModeToggle from "@/components/EditModeToggle";
import { motion } from "framer-motion";

interface PageShellProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  children: (editMode: boolean) => React.ReactNode;
}

const PageShell = ({ title, description, icon, gradient, children }: PageShellProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Page header */}
      <div className={`bg-gradient-to-r ${gradient} py-10 sm:py-14`}>
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                {icon}
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-primary-foreground">{title}</h1>
                <p className="text-sm text-primary-foreground/70">{description}</p>
              </div>
            </div>
            <EditModeToggle editMode={editMode} onToggle={setEditMode} />
          </motion.div>
        </div>
      </div>

      {/* Page content */}
      <div className="container max-w-5xl py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children(editMode)}
        </motion.div>
      </div>
    </div>
  );
};

export default PageShell;
