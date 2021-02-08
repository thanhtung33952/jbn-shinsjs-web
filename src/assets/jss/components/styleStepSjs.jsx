const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: 40,
    "& *": {
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300
    }
  },
  bockStep: {
    background: "none",
    color: theme.palette.secondary.main,
    paddingLeft: 28,
    paddingBottom: 15
  },
  instructions: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing()
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    "& span": {
      backgroundColor: "red"
    }
  },
  resetContainer: {
    padding: theme.spacing(3),
    "& span": {
      backgroundColor: "red"
    }
  },
  defaultIcon: {
    color: theme.palette.secondary.main
  },
  completedIcon: {
    color: theme.palette.primary.main + `${"!important"}`,
    // background: theme.palette.primary.main,
    fontSize: "20px !important",
    borderRadius: "50%",
    padding: 1,
    border: "solid 1px",
    borderColor: theme.palette.primary.main
  },
  activeIcon: {
    color: theme.palette.pink.main + `${"!important"}`,
    padding: 1,
    border: "solid 1px",
    borderColor: theme.palette.pink.main,
    borderRadius: "50%",
    fontSize: "20px !important"
  },
  defaultLabel: {
    "& span": {
      color: theme.palette.secondary.dark,
      // fontWeight: "bold",
      "& svg": {
        fontSize: 18
      }
    }
  },
  completedLabel: {
    // fontWeight: "bold !important",
    color: theme.palette.primary.main + `${"!important"}`
  },
  activeLabel: {
    fontWeight: "300 !important",
    color: theme.palette.secondary.dark + `${"!important"}`
  },
  connectorDefault: {
    padding: 0,
    marginLeft: 9
  },
  connectorLine: {
    minHeight: 50
  },
  stepItem: {
    "&:last-child $defaultIcon": {
      borderRight: "solid 15px transparent",
      borderLeft: "solid 15px transparent",
      borderTop: "solid 15px",
      borderTopColor: theme.palette.secondary.main,
      fontSize: 0,
      marginLeft: -5
    },
    "&:last-child $completedIcon": {
      borderRadius: 0,
      borderTop: "solid 15px",
      background: "none !important",
      borderTopColor: theme.palette.primary.main + `${"!important"}`
    },
    "&:last-child $activeIcon": {
      borderRadius: 0,
      fontSize: 0,
      border: "none",
      padding: 0,
      borderRight: "solid 15px transparent",
      borderLeft: "solid 15px transparent",
      borderTop: "solid 15px",
      background: "none !important",
      borderTopColor: theme.palette.primary.main + `${"!important"}`
    }
  },
  titleEndStep: {
    color: theme.palette.secondary.dark,
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default styles;
