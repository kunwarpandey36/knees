import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card mt-16">
      <div className="container flex flex-col items-center justify-center h-24 px-4 md:px-6 text-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saheli Knee Care. All rights reserved.
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          This website is made for the Instagram channel{' '}
          <a
            href="https://www.instagram.com/kunwarpandey36"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            kunwarpandey36
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

    