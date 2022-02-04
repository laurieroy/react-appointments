import React from "react";

import { Appointment, AppointmentsDayView } from "../src/Appointment";
import ReactDOM from "react-dom";

describe("Appointment", () => {
  let container;
  let customer;
  const render = (component) => ReactDOM.render(component, container);

  beforeEach(() => {
    container = document.createElement("div");
  });

  it("renders the customer's first name", () => {
    customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch("Ashley");
  });

  it("renders another customer's first name", () => {
    customer = { firstName: "Jordan" };

    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch("Jordan");
  });
});

describe("AppointmentDayView", () => {
  let container;
  const today = new Date();
  const appointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => ReactDOM.render(component, container);

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(container.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders multiple appointments in an ol element", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelector("ol")).not.toBeNull();
    expect(container.querySelector("ol").children).toHaveLength(2);
  });

  it("renders each appointmentsin an li", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });

  it("initially shows a message staying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.textContent).toMatch(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.textContent).toMatch("Ashley")
  })
});
