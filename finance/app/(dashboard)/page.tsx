"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";


export default function Home() {

  const { isOpen, onOpen, onClose } = useNewAccount();
  return (
    <div>
      DashBoard Page

      <Button
        onClick={onOpen}
      >
        teste
      </Button>
    </div>
  );
}
