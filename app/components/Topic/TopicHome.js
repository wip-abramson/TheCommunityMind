import React from "react";
import {Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import TopicList from "../TopicList/TopicList";

export default function TopicHome(props) {
  return (
    <div>
      <h1>This Is the topic homepage</h1>
      <TopicList header="Parent Topics"/>
      <TopicList header="Child Topics"/>
      <LinkContainer to="/why">
        <Button>View Whys</Button>
      </LinkContainer>

    </div>

  )
}