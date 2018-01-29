import React from 'react';
import { render, shallow, html } from 'enzyme';
import SessionButtons from 'Components/nav_bar/session_buttons';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe('SessionButtons', ()=>{
    let tree;
    describe("When not logged in", ()=>{
        beforeEach(() => {
            tree = shallow(
              <SessionButtons loggedIn={false}/>
            );
        });
        it("should display a signup button", ()=>{
            expect(tree.text().toLowerCase()).toEqual(expect.stringContaining("sign up"));
        });
        it("should display a login button", ()=>{
            expect(tree.text().toLowerCase()).toEqual(expect.stringContaining("log in"));
        });
    });
    describe("When logged in", ()=>{
        beforeEach(() => {
            tree = shallow(
                <SessionButtons loggedIn={true} currentUser={{username:"bob", is_admin: false}}/>
            );
        });
        it("should display a logout button", ()=>{
            expect(tree.text().toLowerCase()).toEqual(expect.stringContaining("log out"));
        });
    });

    describe("When the current user is not an admin", ()=>{
        beforeEach(() => {
            tree = shallow(
              <SessionButtons loggedIn={true} currentUser={{username:"bob", is_admin: false}}/>
            );
        });
        it("should not display a dashboard link", ()=>{
            expect(tree.text().toLowerCase()).not.toEqual(expect.stringContaining("navlink"));
        });
    });
    describe("When the current user is an admin", ()=>{
        beforeEach(() => {
            tree = shallow(
              <SessionButtons loggedIn={true} currentUser={{username:"bob", is_admin: true}}/>
            );
        });
        it("should display a dashboard link", ()=>{
            expect(tree.text().toLowerCase()).toEqual(expect.stringContaining("navlink"));
        });
    });
    
});