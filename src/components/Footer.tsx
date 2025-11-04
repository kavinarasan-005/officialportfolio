import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";

export default function Footer() {
  // get the current time in UTC+1 time zone
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          timeZone: "Asia/Dubai",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[2%] to-transparent">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 py-4 sm:py-6 px-4">
        <span className="flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              href="https://linkedin.com/in/kavinarasan"
              target="_blank"
              passHref
              className="text-foreground transition-all duration-300 hover:text-primary hover:underline"
            >
              Kavin Arasan
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex flex-row items-center space-x-2">
            <p className="text-xs text-muted-foreground">Local time:</p>
            <p className="text-sm font-semibold">{time} UTC+4</p>
          </span>
        </span>
        <Link
          href="mailto:kavinarasan2019@gmail.com"
          passHref
          className="text-xs text-muted-foreground transition-all duration-300 hover:text-foreground"
        >
          <Button variant={"outline"} className="w-full sm:w-auto">
            <MailIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:flex">kavinarasan2019@gmail.com</span>
          </Button>
        </Link>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-30 transition-opacity duration-300 hover:opacity-50" />
    </footer>
  );
}
