import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    toast({
      title: "Logged out",
      description: "You have been signed out successfully.",
    });
    setLocation("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="EduWisp"
              className="w-9 h-9 rounded-lg shrink-0 object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span
                className="font-bold text-xl text-primary leading-none"
                style={{
                  fontFamily: "var(--app-font-display, var(--app-font-sans))",
                }}
              >
                EduWisp
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide leading-none mt-0.5">
                A Unit of Cipherwisp Finsoft Technologies Private Limited
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="relative gap-2"
                data-testid="nav-cart-button"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleLogout}
                data-testid="nav-logout-button"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  className="gap-2"
                  data-testid="nav-login-button"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="nav-mobile-menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  location === link.href
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={handleLogout}
                data-testid="nav-mobile-logout"
              >
                <LogOut className="w-4 h-4" />
                Logout{user?.name ? ` (${user.name})` : ""}
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/8"
                onClick={() => setMenuOpen(false)}
                data-testid="nav-mobile-login"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
