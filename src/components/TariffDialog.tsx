
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ReactNode, useState } from "react";
import TariffForm from "./TariffForm";

interface TariffDialogProps {
  children: ReactNode;
  tariffName: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const TariffDialog = ({ 
  children, 
  tariffName,
  className,
  variant = "default",
  size = "default"
}: TariffDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  
  console.log("t function:", t);
  console.log("Dialog title params:", { tariff: tariffName });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {typeof children === 'string' ? (
          <Button 
            variant={variant} 
            size={size}
            className={className}
          >
            {children}
          </Button>
        ) : (
          <div className="inline-block">{children}</div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("tariffDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("tariffDialog.description")}
          </DialogDescription>
        </DialogHeader>
        <TariffForm 
          onSuccess={() => setIsOpen(false)}
          tariffName={tariffName} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default TariffDialog;
