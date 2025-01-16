import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background dark:bg-offblack ">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 dark:bg-offblack ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* <div className="space-y-3">
            <h3 className="text-sm font-medium">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/documentation"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Documentation
              </Link>
              <Link
                href="/api"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                API
              </Link>
              <Link
                href="/support"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Support
              </Link>
            </nav>
          </div> */}
          {/* <div className="space-y-3">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="/disclaimer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Disclaimer
              </Link>
            </nav>
          </div> */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">About</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About Us
              </Link>
              {/* <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Admin
              </Link> */}
            </nav>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Veritas. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link
              href="/sitemap"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
