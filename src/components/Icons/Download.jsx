import React from "react";

class DownloadIcon extends React.Component {
  render = () => {
    const { ...rest } = this.props;
    return (
      <svg
        {...rest}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
      >
        <g>
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
        </g>
      </svg>
    );
  };
}

export default DownloadIcon;
