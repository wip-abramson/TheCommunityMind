/**
 * Created by will on 28/07/17.
 */

import React from "react";
import { mount } from "enzyme";
import Authentication from '../app/components/Authentication/AuthenticationUI';

describe("Authentication", () => {
  let props;
  let mountedAuthenitcation;
  const authentication = () => {
    if (!mountedAuthenitcation) {
      mountedAuthenitcation = mount(
        <Authentication {...props} />
      )
    }

    return mountedAuthenitcation;
  }

  beforeEach(() => {
    props = {
      isLoginAuth: undefined,
      errorMsg: undefined,
      submitForm: undefined
    }
  })

  it("always renders a div", () => {
    const divs = authentication().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = authentication().find("div");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on lockScreen(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(lockScreen().children());
    });
  });

})
