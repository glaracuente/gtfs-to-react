import React from "react";
import cx from "classnames";
import maxBy from "lodash/maxBy";
import PropTypes from "prop-types";
import AutoSizer from "react-virtualized/dist/es/AutoSizer";
import MultiGrid from "react-virtualized/dist/es/MultiGrid";

const stopPropTypes = {
  stop_id: PropTypes.string,
  stop_name: PropTypes.string,
  stop_lat: PropTypes.number,
  stop_lon: PropTypes.number
};

const RouteTable = ({ stops, timetable }) => {
  if (!stops || !timetable) return null;
  const processedTimetable = timetable.reduce((acc, val) => {
    acc[val.stop_sequence] = acc[val.stop_sequence] || [];
    acc[val.stop_sequence].push(val);
    return acc;
  }, []).filter(item => !!item);
  const cellRenderer = ({ style, key, rowIndex, columnIndex }) => {
    const isEven = !!(rowIndex % 2);
    let text = '';
    try {
      text = !rowIndex
        ? stops[columnIndex].stop_name
        : (processedTimetable[columnIndex][rowIndex - 1] || {}).arrival_time;
    } catch(ex) {
      text = '';
    }

    return (
      <div
        key={key}
        style={style}
        className={cx("cell", { even: isEven, odd: !isEven })}
      >
        { text }
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <MultiGrid
          enableFixedColumnScroll
          fixedRowCount={1}
          cellRenderer={cellRenderer}
          columnWidth={() => 120}
          columnCount={stops.length}
          height={height}
          noContentRenderer={this._noContentRenderer}
          rowHeight={({ index }) => (!index ? 80 : 40)}
          rowCount={maxBy(processedTimetable, "length").length + 1}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

RouteTable.propTypes = {
  route: PropTypes.shape({
    route_long_name: PropTypes.string
  }),
  stops: PropTypes.arrayOf(PropTypes.shape(stopPropTypes))
};

export default RouteTable;
