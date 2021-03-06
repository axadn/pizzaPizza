
import React from 'react';
import { shallow } from 'enzyme';
import Order from 'Components/order/order.jsx';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe('Order', () => {
  let tree;
  beforeEach(() => {
    tree = shallow(
      <Order sizes={
        {
          1:{id: 1, name: "x-large", price: 30},
          10:{id: 10, name: "small", price: 2},
          2:{id: 2, name: "large", price: 10}
        }
      } 
      toppings={
        {
          0: {id: 0, name: "pepperoni", price: 10},
          10: {id: 10, name: "anchovies", price: 2},
          1: {id: 1, name: "balogna", price: 3}
        }
      }/>
    );
  });
  it('should sort sizes by price', () => {
    const sizeOptions = tree.find('select[name="size"] option');
    expect(sizeOptions.at(1).text()).toEqual("small"); // at(1) because of default selected hidden option
  });
  it('should sort toppings alphabetically', ()=>{
    const toppingLabels = tree.find(".pizza-customizaton-form_group label");
    expect(toppingLabels.at(0).text()).toEqual(expect.stringContaining("anchovies"));
  });
  it('should add up the total of selected size and toppings', ()=>{
    const select= tree.find(".size-select-fieldSet select").at(0);
    select.simulate("change", {target:{value: 1}, stopPropagation: ()=>{}});
    const balogna = tree.find('.pizza-customizaton-form_group input').at(1);
    balogna.simulate("change", {target:{value: 1, checked: true}, stopPropagation: ()=>{}});
    const pepperoni = tree.find('.pizza-customizaton-form_group input').at(2);
    pepperoni.simulate("change", {target:{value: 0, checked: true}, stopPropagation: ()=>{}});
    const totalText = tree.find(".pizza-checkout-container").text();
    expect(totalText).toEqual(expect.stringContaining("43.00"));
  });
});