import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button";

describe("Button Component", () => {
  it("should render button with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
  });

  it("should render button with custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole("button", { name: "Custom Button" });
    expect(button).toHaveClass("custom-class");
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render different variants", () => {
    const { rerender } = render(
      <Button variant="destructive">Destructive</Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border", "bg-background");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-secondary");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");

    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "text-primary",
      "underline-offset-4",
    );
  });

  it("should render different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8", "rounded-md");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10", "rounded-md");

    rerender(<Button size="icon">Icon</Button>);
    expect(screen.getByRole("button")).toHaveClass("size-9");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50",
    );
  });

  it("should render as child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should forward ref correctly", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref).toHaveBeenCalled();
  });

  it("should handle keyboard events", () => {
    const handleKeyDown = vi.fn();
    render(<Button onKeyDown={handleKeyDown}>Keyboard Button</Button>);

    const button = screen.getByRole("button", { name: "Keyboard Button" });
    fireEvent.keyDown(button, { key: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe("buttonVariants", () => {
  it("should generate correct classes for variants", () => {
    const defaultClasses = buttonVariants({ variant: "default" });
    expect(defaultClasses).toContain("bg-primary");

    const destructiveClasses = buttonVariants({ variant: "destructive" });
    expect(destructiveClasses).toContain("bg-destructive");
  });

  it("should generate correct classes for sizes", () => {
    const defaultSizeClasses = buttonVariants({ size: "default" });
    expect(defaultSizeClasses).toContain("h-9");

    const smSizeClasses = buttonVariants({ size: "sm" });
    expect(smSizeClasses).toContain("h-8");
  });

  it("should combine variant and size classes", () => {
    const classes = buttonVariants({ variant: "outline", size: "lg" });
    expect(classes).toContain("border");
    expect(classes).toContain("h-10");
  });
});
