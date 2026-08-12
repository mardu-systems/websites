import { Check } from "lucide-react";
import { Button } from "@mardu/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@mardu/ui/components/dialog";
import { cn } from "@mardu/ui/lib/utils";

type WhitepaperSuccessDialogProps = {
  description: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
  variant?: "default" | "editorial-index";
};

export function WhitepaperSuccessDialog({
  description,
  onOpenChange,
  open,
  title,
  variant = "default",
}: WhitepaperSuccessDialogProps) {
  const editorial = variant === "editorial-index";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-md",
          editorial && "rounded-none border-border bg-background",
        )}
      >
        <DialogHeader>
          <DialogTitle
            className={cn(
              "flex items-center gap-2",
              editorial ? "text-foreground" : "text-emerald-600",
            )}
          >
            <Check
              className={cn("size-6", editorial && "text-mardu-purple")}
              aria-hidden="true"
            />
            {title}
          </DialogTitle>
          <DialogDescription className="pt-2 whitespace-pre-line text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Verstanden
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
