




export default function ModifySet() {
const classes = useStyles();
const { user, getTokenSilently } = useAuth0();
const [open, setOpen] = React.useState(false);
const [fetched, setFetched] = useState(false);
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(anchorEl ? null : event.currentTarget);
};

const open = Boolean(anchorEl);
const id = open ? "simple-popper" : undefined;

const handleDeleteSet = async () => {
    const token = await getTokenSilently();

    const res = await fetch(`${api}/sets/${set.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        alert("authorization denied");
    } else {
        alert("Set was successfully deleted");
        setFetched(false);
    }
};
    return (
      <div>
        <button aria-describedby={id} type="button" onClick={handleClick}>
          Toggle Popper
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className={classes.paper}>
            {user && user.userId === setsUserId && (
              <>
                <div className="testing">
                  <IconButton id="edit-icon" onClick={handleOpen}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton id="delete-icon" onClick={handleDeleteSet}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </>
            )}
          </div>
        </Popper>
      </div>
    );
}