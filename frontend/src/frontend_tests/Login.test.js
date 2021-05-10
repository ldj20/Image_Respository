import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login';
import { shallow, configure } from "enzyme";
import renderer from "react-test-renderer";
import DataService from "../services/UserServices";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({adapter: new Adapter()});

describe('test login', () => {
  test("attempt login with empty password", () => {
    DataService.login = jest.fn()
    const click = jest.fn()
    const type = jest.fn()
    const s = shallow(<Login onChange={type} onClick={click} />);
    s.find("#username").simulate("change", { target: { value: "qw@qw.qw" } });
    setTimeout(() => {
      expect(type).toHaveBeenCalledTimes(1);
      done();
    }, 600);
    s.find("#loginSubmit")
      .simulate("click");
    expect(DataService.login).toHaveBeenCalledTimes(0);
  })

  test("attempt login with non-empty fields", () => {
    const { getByText } = render(<Login />);
    DataService.login = jest.fn()
    const click = jest.fn()
    const type = jest.fn()
    const s = shallow(<Login onChange={type} onClick={click} />);
    console.log(s.find("#username").debug())
    s.find("#username").simulate("change", { target: { value: "qw@qw.qw" } });
    setTimeout(() => {
      expect(type).toHaveBeenCalledTimes(1);
      done();
    }, 600);
    s.find("#loginPW").simulate("change", { target: { value: "qwqwqw" } });
    setTimeout(() => {
      expect(type).toHaveBeenCalledTimes(2);
      done();
    }, 600);
    s.find("#loginSubmit")
      .simulate("click");
    expect(DataService.login).not.toHaveBeenCalledTimes(1);
  })
})
