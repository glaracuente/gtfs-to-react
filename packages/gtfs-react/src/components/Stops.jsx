import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

import { Link } from "react-router-dom";
import List from "antd/lib/list";
import Search from "antd/lib/input/Search";

import StopsMap from "./StopsMap";

const Stops = ({ stops, searchQuery, onSearch, activeItem, onHover }) => {
  const Stop = stop => {
    const { stop_id, stop_name } = stop;
    return (
      <List.Item onMouseOver={() => onHover(stop)}>
        <Link to={`/stops/${stop_id}`}>
          {stop_id} - {stop_name}
        </Link>
      </List.Item>
    );
  };

  return (
    <Row>
      <Col span={6} style={{ height: "100vh", overflow: "scroll" }}>
        <Search
          placeholder="Search"
          onChange={ev => {
            onSearch(ev.target.value);
          }}
        />
        <List
          style={{ height: "100%" }}
          dataSource={stops.filter(
            stop => stop.stop_name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 || stop.stop_id.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
          )}
          renderItem={Stop}
          bordered
        />
      </Col>
      <Col span={18}>
        <StopsMap
          showLine={false}
          style={{ height: "100vh" }}
          stops={activeItem ? [activeItem] : []}
        />
      </Col>
    </Row>
  );
};

Stops.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      stop_id: PropTypes.string,
      stop_name: PropTypes.string
    })
  )
};

export default Stops;
