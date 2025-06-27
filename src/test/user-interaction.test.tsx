import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

// 간단한 폼 컴포넌트 예제
function SimpleForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <div>Thank you, {name}!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

describe("User Interaction Tests", () => {
  it("should handle form submission with fireEvent", async () => {
    render(<SimpleForm />);

    const nameInput = screen.getByLabelText("Name:");
    const emailInput = screen.getByLabelText("Email:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    // fireEvent를 사용한 입력
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Thank you, John Doe!")).toBeInTheDocument();
  });

  it("should handle form submission with userEvent", async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    const nameInput = screen.getByLabelText("Name:");
    const emailInput = screen.getByLabelText("Email:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    // userEvent를 사용한 더 자연스러운 상호작용
    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.click(submitButton);

    expect(screen.getByText("Thank you, Jane Doe!")).toBeInTheDocument();
  });

  it("should handle keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    const nameInput = screen.getByLabelText("Name:");
    const emailInput = screen.getByLabelText("Email:");

    // Tab 키를 사용한 포커스 이동
    await user.tab();
    expect(nameInput).toHaveFocus();

    await user.tab();
    expect(emailInput).toHaveFocus();
  });

  it("should handle copy and paste", async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    const nameInput = screen.getByLabelText("Name:");
    const emailInput = screen.getByLabelText("Email:");

    // 복사/붙여넣기 테스트
    await user.type(nameInput, "Test Name");
    await user.selectOptions(nameInput, "Test Name");
    await user.copy();
    await user.click(emailInput);
    await user.paste();

    expect(emailInput).toHaveValue("Test Name");
  });

  it("should handle form validation", async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    // 빈 폼 제출 시도
    await user.click(submitButton);

    // 폼이 제출되지 않아야 함
    expect(screen.queryByText(/Thank you/)).not.toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should handle input clearing", async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    const nameInput = screen.getByLabelText("Name:");

    await user.type(nameInput, "Test");
    expect(nameInput).toHaveValue("Test");

    // 입력값 지우기
    await user.clear(nameInput);
    expect(nameInput).toHaveValue("");
  });

  it("should handle double click", async () => {
    const user = userEvent.setup();
    const handleDoubleClick = vi.fn();

    render(<button onDoubleClick={handleDoubleClick}>Double Click Me</button>);

    const button = screen.getByRole("button", { name: "Double Click Me" });
    await user.dblClick(button);

    expect(handleDoubleClick).toHaveBeenCalledTimes(1);
  });

  it("should handle hover events", async () => {
    const user = userEvent.setup();
    const handleMouseEnter = vi.fn();
    const handleMouseLeave = vi.fn();

    render(
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-testid="hover-target"
      >
        Hover me
      </div>,
    );

    const target = screen.getByTestId("hover-target");

    await user.hover(target);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);

    await user.unhover(target);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });
});
