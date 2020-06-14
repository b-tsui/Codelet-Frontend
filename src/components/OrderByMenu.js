import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import FilterListIcon from "@material-ui/icons/FilterList";

export default function OrderByMenu({ sets, setSets }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePopularity = () => {
    let sortedSet = sets.sort((a, b) => {
      return b.num_upvotes - a.num_upvotes;
    });
    setSets(sortedSet);
    setAnchorEl(null);
  };

  const handleDate = () => {
    let sortedSet = sets.sort((a, b) => {
      return b.id - a.id;
    });
    setSets(sortedSet);
    setAnchorEl(null);
  };

  const handleCount = () => {
    let sortedSet = sets.sort((a, b) => {
      return b.card_count - a.card_count;
    });
    setSets(sortedSet);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "#d3d3d3" }}
      >
        Filter <FilterListIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handlePopularity}>
          <Link to="/" style={{ color: '#00897b' }}>Popularity</Link>
        </MenuItem>
        <MenuItem onClick={handleDate}>
          <Link to="/" style={{ color: '#00897b' }}>Newest</Link>
        </MenuItem>
        <MenuItem onClick={handleCount}>
          <Link to="/" style={{ color: '#00897b' }}># Cards</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
