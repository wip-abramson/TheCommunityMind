import React from "react";
import {Breadcrumb} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default function TopicBreadcrumb(props) {


  return (
    <Breadcrumb>
      <LinkContainer to="/topic">
        <Breadcrumb.Item>
          Home
        </Breadcrumb.Item>
      </LinkContainer>
      <LinkContainer to="/why">
        <Breadcrumb.Item>
          Why
        </Breadcrumb.Item>
      </LinkContainer>
      <LinkContainer to="/whatif">
        <Breadcrumb.Item>
          What If
        </Breadcrumb.Item>
      </LinkContainer>
      <LinkContainer to="/how">
        <Breadcrumb.Item>
          How
        </Breadcrumb.Item>
      </LinkContainer>

    </Breadcrumb>
  )
}