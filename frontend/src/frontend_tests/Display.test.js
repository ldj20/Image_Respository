import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import { shallow, configure } from "enzyme";
import renderer from "react-test-renderer";
import DataService from "../services/UserServices";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FileInput from '../components/FileInput';
configure({adapter: new Adapter()});

describe('test login', () => {
    test("check render", () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <FileInput />
            </BrowserRouter>,
            div
        )
    })
    test("inspect image page", () => {
        const { getByText } = render(<FileInput />);

        const s = shallow(<FileInput />);
        s.find("#isPublic").simulate('change', {target: {checked: true}});
        s.find("#fileInputButton").simulate('click');
        expect(window.location.reload).toHaveBeenCalled();
    })
    // test("attempt login with empty password", () => {
    //   DataService.login = jest.fn()
    //   const click = jest.fn()
    //   const type = jest.fn()
    //   const s = shallow(<Login onChange={type} onClick={click} />);
    //   s.find("#username").simulate("change", { target: { value: "qw@qw.qw" } });
    //   setTimeout(() => {
    //     expect(type).toHaveBeenCalledTimes(1);
    //     done();
    //   }, 600);
    //   s.find("#loginSubmit")
    //     .simulate("click");
    //   expect(DataService.login).toHaveBeenCalledTimes(0);
    // })
})