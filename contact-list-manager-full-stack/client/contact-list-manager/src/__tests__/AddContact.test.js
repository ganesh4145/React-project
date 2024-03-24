import { render, fireEvent, screen } from "@testing-library/react";
import Header from "../Components/Header";
import AddContact from "../Components/AddContact.js";

describe("AddContact render", () => {
  test("check the button", async () => {
    render(<AddContact />);
    const buttonList = await screen.getByRole("button");
    expect(buttonList).toBeInTheDocument();
  });
  test("check the name label", async () => {
    render(<AddContact />);
    const nameLabel = await screen.getByLabelText("Name", {
      selector: "input",
    });
    expect(nameLabel).toBeInTheDocument();
  });
  test("check the email label", async () => {
    render(<AddContact />);
    const emailLabel = await screen.getByRole("textbox", {
      name: "Email",
    });
    expect(emailLabel).toBeInTheDocument();
  });
});

describe("Ui inteeraction", () => {
  test("check name input text box", async () => {
    render(<AddContact />);
    const nameTextbox = screen.getByRole("textbox", {
      name: "Name",
    });
    expect(nameTextbox).toHaveTextContent("");
  });
  test("check email input box", async () => {
    render(<AddContact />);
    const emailTextbox = screen.getByRole("textbox", {
      name: "Email",
    });
    expect(emailTextbox).toHaveTextContent("");
  });
});

describe("Email validation", () => {
  test("should contain @ symbol in email", () => {
    render(<AddContact />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalidemail.com" } });
    expect(emailInput.value.includes("@")).toBe(false);
    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    expect(emailInput.value.includes("@")).toBe(true);
  });
});

describe("Name validation", () => {
  test("name checking", () => {
    render(<AddContact />);
    const inputElement = screen.getByLabelText("Name");
    fireEvent.change(inputElement, { target: { value: "Ganesh kumar" } });
    expect(inputElement.value).toBe("Ganesh kumar");
  });

  test("name length less than 50", async () => {
    render(<AddContact />);
    const inputElement = screen.getByLabelText("Name");
    fireEvent.change(inputElement, { target: { value: "a".repeat(60) } });
    expect(inputElement.value.length).not.toBe(50);
    fireEvent.change(inputElement, { target: { value: "a".repeat(50) } });
    expect(inputElement.value.length).toBe(50);
  });
});
